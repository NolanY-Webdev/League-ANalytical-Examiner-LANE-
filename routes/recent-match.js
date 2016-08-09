'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var sort = require('../matchSorting');
router
  .route('/')
  // get player recent match info
  // /api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent
  .get(function(req,res) {
    var region = 'na';
    // console.log('query',req.query);
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
      console.log('match info->',parsed.games[0].gameId);
      console.log('RECENTMATCH BRAH');

      //parsing server data into match data
      var sorted = sort(parsed);
      // console.log('IT IS NOW SORTED',sorted);
      parsed.sortedData = sorted;
      // console.log(parsed.sortedData);
      res.send(parsed);
    });
  });

module.exports = router;
