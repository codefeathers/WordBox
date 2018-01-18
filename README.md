# w 🔥

### WordBox—A truly modern development environment for WordPress and PHP

> WordBox is a portmanteau of WordPress and Sandbox. Although the name implies WordPress, you can really put in any PHP script using WordBox just as easily.

WordBox is a truly modern WordPress site development (and deployment) environment.

Bring the power of Node.JS to your WordPress environment!

### Running the server

Steps 1-3 will have an automated option later.

1. Download php zip from https://php.net and place the extracted files under `/php`.
2. Download WordPress from https://wordpress.org and place the extracted files under `/public`.
3. [Optional / Haven't tested] If you're on Linux, edit the config file to point to your `php-cgi` bin file.
4. Run `npm install` to install dependencies (Express).
5. Run `node .` to start the server.

### Versioning

Thanks to @wbhob for donating the npm `w` package to me.

Because npm versions are immutable, our public version number starts directly to `v.1.1.0`. The project should be considered unstable until `v.2.0.0` which will be WordBoxed's first stable release version.

Like many software, `WordBox` will have an internal version number and external version number. The current internal version is `v.0.x.x` and external version is `v.1.x.x`. As the internal version reaches public release, it will skip over from `v.0.9.x` to `v.2.0.0` and catch up with its external version.