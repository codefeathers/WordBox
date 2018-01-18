module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"no-console": "off",
		"no-var": "error",
		"prefer-const": [
			"error", {
			"destructuring": "all"
		}],
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": "off",
		"semi": [
			"error",
			"never"
		]
	}
};