'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

router
    .route('/')

    // get summoners info
    //api/lol/{region}/v1.4/summoner/by-name/{summonerNames}
    .get(function(req,res) {
      var region = 'na';
      // console.log(req.query);
      request.get({
        url : 'https://' + region +
          '.api.pvp.net/api/lol/' + region +
          '/v1.4/summoner/by-name/' + req.query.summonerName + '?api_key=' + process.env.LOL_API_KEY
      }, function(err, response, body) {
        if (err) {
          return res.status(500).json(err);
        }
        res.send(body);
      });
    });

module.exports = router;