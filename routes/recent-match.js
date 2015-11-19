'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var champion = require('../championSelect');

router
  .route('/')

  // get player recent match info
  // /api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent
  .get(function(req,res) {
    var region = 'na';
    console.log('query',req.query);
    // var summonerId = '59698121';
    request.get({
      url : 'https://' + region + '.api.pvp.net/api/lol/' + region +
            '/v1.3/game/by-summoner/' + req.query.summonerId +
            '/recent?api_key=' + process.env.LOL_API_KEY
    }, function(err, response, body) {
      //err handling
      if (err) {
        return res.status(500).json(err);
      }
   // prune body
      var parsed = JSON.parse(body);
      console.log('this is the body',parsed);

      // loop through array of participants
      for (var i = 0; i < parsed.games.length; i++) {
        // loop through champion array on champtionSelect.js
        for (var j = 0; j < champion.length; j++) {
          // checks if participants
          // console.log(parsed.participants[i].championId);
          // console.log(champion[j].key);

          if (parsed.games[i].championId == champion[j].key) {
            parsed.games[i].championImage = champion[j].image;
            console.log('championId: ', champion[j].key);
            console.log(parsed.games[i].championImage = champion[j].image);
          }
        }
      }

      res.send(body);
    });
  });

module.exports = router;