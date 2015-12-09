var gulp        = require('gulp');
var source      = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require('reactify');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var babel       = require('babelify');
var esdoc       = require('gulp-esdoc');
var lrport      = 4002;


/***************************************************
 *  Javascript browserify & reactify
 ***************************************************/

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./src/js/app.js'], // Only need initial file, browserify finds the deps
        transform: [babel.configure({plugins: ['object-assign'], optional: ['es7.decorators']})], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);
    return watcher
        .on('update', function () { // When any files update
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle() // Create new bundle that uses the cache for high performance
                .pipe(source('main.js'))
                // This is where you add uglifying etc.
                .pipe(gulp.dest('./public/js/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .on('end', notifyLiveReload)
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'))
});

/***************************************************
 *  SASS
 ***************************************************/
gulp.task('sass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/'));
});


/***************************************************
 *  EXPRESS SERVER WITH LIVERELOAD
 *
 *
 ***************************************************/
var tinylr;
gulp.task('serve', function() {
    var express = require('express');
    var app = express();
    var fs = require('fs');
    var path = require('path');
    var bodyParser = require('body-parser');

    var RATINGS_FILE = path.join(__dirname, 'stubs/ratings.json');

    var BEERS_FILE = path.join(__dirname, 'stubs/beers.json');

    app.use(require('connect-livereload')({
        port: lrport
    }));

    app.set('port', (process.env.PORT || 3000));

    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/beers', function(req, res) {
        fs.readFile(BEERS_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.setHeader('Cache-Control', 'no-cache');
            res.json(JSON.parse(data));
        });
    });

    app.get('/api/ratings', function(req, res) {
        fs.readFile(RATINGS_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.setHeader('Cache-Control', 'no-cache');
            res.json(JSON.parse(data));
        });
    });

    app.post('/api/ratings', function(req, res) {
        fs.readFile(RATINGS_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            var ratings = req.body.ratings;

            fs.writeFile(RATINGS_FILE, JSON.stringify(ratings, null, 4), function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                res.setHeader('Cache-Control', 'no-cache');
                res.json(ratings);
            });
        });
    });

    var server = app.listen(app.get('port'), function() {
        console.log('Server running at http://%s:%s', server.address().address, server.address().port);
    });
});


gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(lrport);
})

var notifyLiveReload = function (event) {
    if(!tinylr || !tinylr.changed) return;
    console.log('notify reload on event %s', event.path);
    var fileName = require('path').relative(__dirname + '/public', event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

/***************************************************
 *  WATCHERS
 ***************************************************/

gulp.task('watch', function() {
    gulp.watch(['./public/**/*.html', './public/**/*.css','./public/**/*.js'], notifyLiveReload);
    gulp.watch(['./src/**/*.scss'],['sass']);
    gulp.watch('./src/**/*.js', ['docs']);
});

/***************************************************
 *  ESDOC
 ***************************************************/
gulp.task('docs', function() {
    gulp.src("./src")
        .pipe(esdoc({ destination: './docs'}));
})

gulp.task('default', ['browserify', 'sass', 'livereload','serve','watch']);
