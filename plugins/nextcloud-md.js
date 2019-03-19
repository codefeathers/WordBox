module.exports = app => app.use((req, res, next) =>
	req.originalUrl.includes('index.php')
		? next()
		: res.redirect('/index.php' + req.originalUrl));
