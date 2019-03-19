'use strict';

const url = require('url');
const child = require('child_process');
const path = require('path');
const fs = require('fs');

function runPHP(req, res, { cgi, ini, public: publicDir }) {
	const parts = url.parse(req.url);
	const query = parts.query;

	let file = path.join(publicDir, parts.pathname);

	if (!fs.existsSync(file)) {
		file = path.join(publicDir, "index.php");
	} else if (fs.statSync(file).isDirectory()) {
		file = path.join(file, "index.php");
	}

	let pathinfo = "";
	const i = req.url.indexOf(".php");
	if (i > 0) pathinfo = parts.pathname.substring(i + 4);
	else pathinfo = parts.pathname;

	const env = {
		SERVER_SIGNATURE: "WordBox Server",
		//The extra path information, as given in the requested URL. In fact, scripts can be accessed by their virtual path, followed by extra information at the end of this path. The extra information is sent in PATH_INFO.
		PATH_INFO: pathinfo,
		//The virtual-to-real mapped version of PATH_INFO.
		PATH_TRANSLATED: "",
		//The virtual path of the script being executed.
		SCRIPT_NAME: parts.pathname,
		SCRIPT_FILENAME: file,
		//The real path of the script being executed.
		REQUEST_FILENAME: file,
		//The full URL to the current object requested by the client.
		SCRIPT_URI: req.url,
		//The full URI of the current request. It is made of the concatenation of SCRIPT_NAME and PATH_INFO (if available.)
		URL: req.url,
		SCRIPT_URL: req.url,
		//The original request URI sent by the client.
		REQUEST_URI: req.url,
		//The method used by the current request; usually set to GET or POST.
		REQUEST_METHOD: req.method,
		//The information which follows the ? character in the requested URL.
		QUERY_STRING: parts.query || "",
		//"multipart/form-data", //"application/x-www-form-urlencoded", //The MIME type of the request body; set only for POST or PUT requests.
		CONTENT_TYPE: req.get("Content-type") || "",
		//The length in bytes of the request body; set only for POST or PUT requests.
		CONTENT_LENGTH: req.rawBody.length || 0,
		//The authentication type if the client has authenticated itself to access the script.
		AUTH_TYPE: "",
		AUTH_USER: "",
		//The name of the user as issued by the client when authenticating itself to access the script.
		REMOTE_USER: "",
		//All HTTP headers sent by the client. Headers are separated by carriage return characters (ASCII 13 - \n) and each header name is prefixed by HTTP_, transformed to upper cases, and - characters it contains are replaced by _ characters.
		ALL_HTTP:
			Object
				.keys(req.headers)
				.map((x) => { "HTTP_" + x.toUpperCase().replace("-", "_") + ": " + req.headers[x] })
				.reduce((a, b) => { a + b + "\n" }, ""),
		//All HTTP headers as sent by the client in raw form. No transformation on the header names is applied.
		ALL_RAW:
			Object
				.keys(req.headers)
				.map((x) => { x + ": " + req.headers[x] })
				.reduce((a, b) => { a + b + "\n" }, ""),
		SERVER_SOFTWARE: "WordBox", //The web server's software identity.
		SERVER_NAME: "localhost", //The host name or the IP address of the computer running the web server as given in the requested URL.
		SERVER_ADDR: "127.0.0.1", //The IP address of the computer running the web server.
		SERVER_PORT: 8011, //The port to which the request was sent.
		GATEWAY_INTERFACE: "CGI/1.1", //The CGI Specification version supported by the web server; always set to CGI/1.1.
		SERVER_PROTOCOL: "", //The HTTP protocol version used by the current request.
		REMOTE_ADDR: "", //The IP address of the computer that sent the request.
		REMOTE_PORT: "", //The port from which the request was sent.
		DOCUMENT_ROOT: "", //The absolute path of the web site files. It has the same value as Documents Path.
		INSTANCE_ID: "", //The numerical identifier of the host which served the request. On Abyss Web Server X1, it is always set to 1 since there is only a single host.
		APPL_MD_PATH: "", //The virtual path of the deepest alias which contains the request URI. If no alias contains the request URI, the variable is set to /.
		APPL_PHYSICAL_PATH: "", //The real path of the deepest alias which contains the request URI. If no alias contains the request URI, the variable is set to the same value as DOCUMENT_ROOT.
		IS_SUBREQ: "", //It is set to true if the current request is a subrequest, i.e. a request not directly invoked by a client. Otherwise, it is set to true. Subrequests are generated by the server for internal processing. XSSI includes for example result in subrequests. 
		REDIRECT_STATUS: 1,
	};

	Object
		.keys(req.headers)
		.forEach(x =>
			env["HTTP_" + x.toUpperCase().replace("-", "_")] = req.headers[x]);

	if (/.*?\.php$/.test(file)) {
		let response = "", error = "";

		const php = child.spawn(cgi, [ '-c', ini ], { env });

		php.stdin.write(req.rawBody);

		php.stdout.on("data", data => response += data.toString());
		php.stderr.on("data", data => error += data.toString());
		php.on("error", err => console.error(err));
		php.on("exit", () => {
			php.stdin.end();

			const lines = response.split("\r\n");
			let line = 0;
			let html = "";
			if (lines.length) {
				do {
					const m = lines[line].split(": ");
					if (m[0] === "") break;
					if (m[0] == "Status") res.statusCode = parseInt(m[1]);
					if (m.length == 2) res.setHeader(m[0], m[1]);
					line++;
				} while (lines[line] !== "");

				html = lines.splice(line + 1).join("\n");
			} else {
				html = response;
			}
			res.status(res.statusCode).send(html);
			res.end();
		});

	} else {
		res.sendFile(file);
	}
}

exports.cgi = function ({ php: config }) {
	return function (req, res) {
		let data = null;

		req.setEncoding('utf8');
		req.on('data', function (chunk) {
			if (!data) data = chunk;
			else data = data + chunk;
		});
		req.on('end', function () {
			req.rawBody = data || "";
			runPHP(req, res, config);
		});
	};
};
