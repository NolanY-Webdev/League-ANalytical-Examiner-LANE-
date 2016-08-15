// Express Routes
'use strict';
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var getSummoner = require('./routes/summoner');
var getRecentMatch = require('./routes/recent-match');
var getMatch = require('./routes/match');

// var bodyParser = require('body-parser');

// app.set('view engine', 'html');
app.use(express.static('./public'));

app.use('/getSummoner', getSummoner);
app.use('/getRecentMatch', getRecentMatch);
app.use('/getMatch', getMatch);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/riot.txt', function(req, res) {
  res.render('riot.txt');
});

app.listen(PORT, function() {
  console.log('listening on port:', PORT);
  console.log('LISTENBRAH');
});
