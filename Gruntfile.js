var port = 3000;

var polyfilldir = __dirname+'/polyfills';
var testUrls = [];
require('fs').readdirSync(polyfilldir).forEach(function (polyfillName) {
	testUrls.push('http://127.0.0.1:'+port+'/test/tests/'+polyfillName);
});

module.exports = function(grunt) {

	grunt.initConfig({

		"simplemocha": {
			options: {
				globals: ['should'],
				timeout: port,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: ['test/node/**/*.js']
			}
		},
		"mocha": {
			all: {
				options: {
					reporter: 'Spec',
					run: true,
					urls: testUrls
				}
			}
		},
		"saucelabs": {
			all: {
				options: {
					username: 'polyfill-service',
					key: process.env.SAUCE_API_KEY,
					urls: {
						polyfilled: 'http://127.0.0.1:3000/test/tests/',
						native: 'http://127.0.0.1:3000/test/tests/?nopolyfill=1'
					},
					concurrency: 3,
					browsers: browserList
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask("dev", [
		"simplemocha",
		"polyfillservice",
		"mocha",
	]);

	grunt.registerTask("ci", [
		"simplemocha",
		"polyfillservice",
		"saucelabs",
		"compattable"
	]);
};

var browserList  = [
	{
		browserName: 'chrome',
		version: '37',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: 'beta',
		platform: 'Windows 7'
	},
	{
		browserName: 'internet explorer',
		version: '6',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '7',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '8',
		platform: 'Windows XP'
	},
	{
		browserName: 'opera',
		version: '11',
		platform: 'Windows XP'
	},
	{
		browserName: 'opera',
		version: '12',
		platform: 'Windows XP'
	},
	{
		browserName: 'iphone',
		version: '7.1',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'iphone',
		version: '7.0',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'iphone',
		version: '6.1',
		platform: 'OSX 10.8'
	}
];
