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

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/riot.txt', function(req, res) {
  res.render('riot.txt');
});

app.listen(PORT, function() {
  console.log('listening on port:', PORT);
});