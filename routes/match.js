'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var champion = require('../championSelect');
var sort = require('../sortingAlgorithims');

router
  .route('/')
  // get match info
  .get(function(req,res) {
    var region = 'na';
    var matchId = '2003406065';
    request.get({
      // /api/lol/{region}/v2.2/match/{matchId}
      url : 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + matchId + '?api_key=' + process.env.LOL_API_KEY,
      includeTimeline : true

    }, function(err, response, body) {
      //err handling
      if (err) {
        return res.status(500).json(err);
      }

      // prune body
      // console.log(res.send(body));
      res.send(body)
      var parsed = JSON.parse(body);
      // console.log(champion[0].key);
      // console.log(champion.indexOf(parsed.participants[0].championId));

      // loop through array of participants
      for (var i = 0; i < parsed.participants.length; i++) {
        // loop through champion array on champtionSelect.js
        for (var j = 0; j < champion.length; j++) {
          // checks if participants
          // console.log(parsed.participants[i].championId);
          // console.log(champion[j].key);

          if (parsed.participants[i].championId == champion[j].key) {

            console.log('MATCH: ',champion[j].key);
            console.log(parsed.participants.championImage = champion[j].image);

          }
        }
      }
      // console.log(body);
    });
  });
module.exports = router;