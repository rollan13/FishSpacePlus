var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var run = require('gulp-run');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var exists = require('path-exists').sync;
var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');

//Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var jsDest = 'gui/scripts';

var addonsPath = 'addons';


function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

function buildAddons(folders, target, distURL, proxy){
	var proxyValue = proxy;
	for (var i = 0; i < folders.length; i++) {
		if (!target){
			target = '8.5.0';
		}
		if (!proxy){
			proxyValue = '';
		} else {
			proxyValue = '--proxy='+ proxy;
		}
		if(distURL){
			run('cd addons/'+folders[i]+' && node-gyp configure && node-gyp rebuild --target='+ target + ' --dist-url=' + distURL +' '+ proxyValue, {'verbosity': 3}).exec();
		} else {
			run('cd addons/'+folders[i]+' && node-gyp configure && node-gyp rebuild --target='+ target +' '+ proxyValue, {'verbosity': 3}).exec();
		}
	}
	return;
}

function includeNaN(folders){
	for (var i = 0; i < folders.length; i++) {
		run('cd addons/'+folders[i]+' && npm install nan').exec();
	}
	return;
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

gulp.task('start', function() {
	return run('npm start').exec();
})

gulp.task('addons', function() {
  var folders = getFolders(addonsPath);
  console.log(folders);
  return buildAddons(folders, argv.target, argv.distURL, argv.proxy);
});

gulp.task('nan', function() {
	  var folders = getFolders(addonsPath);
	  console.log(folders);
	  return includeNaN(folders);
	});
