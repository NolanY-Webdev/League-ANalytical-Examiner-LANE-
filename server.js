// Express Routes
'use strict';
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var getSummoner = require('./routes/summoner');

// var bodyParser = require('body-parser');

// app.set('view engine', 'html');
app.use(express.static('./public'));
app.use('/getsummoner', getSummoner);
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(PORT, function() {

  console.log('listening on port:', PORT);
});