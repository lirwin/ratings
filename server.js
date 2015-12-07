/**
 * Credit:  Built this Demo using React Tutorial: Comments App
 * https://facebook.github.io/react/docs/tutorial.html
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var RATINGS_FILE = path.join(__dirname, 'ratings.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    var ratings = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newRating = {
      id: Date.now(),
      title: req.body.title,
      text: req.body.text
    };
    ratings.push(newRating);
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


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
