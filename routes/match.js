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
    console.log(req.query);
    request.get({
      // /api/lol/{region}/v2.2/match/{matchId}
      url : 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + req.query.matchId + '?includeTimeline=true&api_key=' + process.env.LOL_API_KEY

    }, function(err, response, body) {
      //err handling
      if (err) {
        return res.status(500).json(err);
      }

      // prune body
      var parsed = JSON.parse(body);

      //parsing server data into match data
      var sorted = sort(parsed);

      parsed.sortedData = sorted;
      // loop through array of participants
      for (var i = 0; i < parsed.participants.length; i++) {
        // loop through champion array on champtionSelect.js
        for (var j = 0; j < champion.length; j++) {
          // checks if participants
          // console.log(parsed.participants[i].championId);
          // console.log(champion[j].key);

          if (parsed.participants[i].championId == champion[j].key) {
            parsed.participants[i].championImage = champion[j].image;
            console.log('MATCH: ', champion[j].key);
            console.log(parsed.participants.championImage = champion[j].image);
          }
        }
      }
      res.send(parsed);
    });
  });
module.exports = router;