module.exports = function (grunt) {

	// Get path to core grunt dependencies from Sails
	var depsPath = grunt.option('gdsrc') || 'node_modules/sails/node_modules';
	grunt.loadTasks(depsPath + '/grunt-contrib-clean/tasks');
	grunt.loadTasks(depsPath + '/grunt-contrib-copy/tasks');
	grunt.loadTasks(depsPath + '/grunt-contrib-rsync/tasks');

	// Load any non-Sails grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			splash: {
				files: [
					{
						expand: true,
						cwd: './assets',
						src: ['**/*'],
						dest: '.dist/public/'
					}
				]
			}
		},

		clean: {
			deploy: ['.dist/public/**']
		},

		rsync: {
			deploy: {
				src: ".dist/",
				dest: "/var/www/claywiese.com/public",
				host: "root@162.243.38.247",
				recursive: true,
				syncDest: true,
				options: {
					args: ["--verbose"]
				}
			}
		}
	});

	

	grunt.registerTask('deploy', [
		'clean:deploy',
		'copy:deploy',
		'rsync'
	]);

	// When API files are changed:
	// grunt.event.on('watch', function(action, filepath) {
	//   grunt.log.writeln(filepath + ' has ' + action);

	//   // Send a request to a development-only endpoint on the server
	//   // which will reuptake the file that was changed.
	//   var baseurl = grunt.option('baseurl');
	//   var gruntSignalRoute = grunt.option('signalpath');
	//   var url = baseurl + gruntSignalRoute + '?action=' + action + '&filepath=' + filepath;

	//   require('http').get(url)
	//   .on('error', function(e) {
	//     console.error(filepath + ' has ' + action + ', but could not signal the Sails.js server: ' + e.message);
	//   });
	// });
};