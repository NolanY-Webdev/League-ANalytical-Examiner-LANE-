'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

router
  .route('/recent')

  // get player recent match info
  // /api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent
  .get(function(req,res) {
    var region = 'na';
    var summonerId = '70460493';
    request.get({
      url : 'https://' + region + '.api.pvp.net/api/lol/' + region +
            '/v1.3/game/by-summoner/' + summonerId +
            '/recent?api_key=' + process.env.LOL_API_KEY
    }, function(err, response, body) {
      //err handling
      if (err) {
        return res.status(500).json(err);
      }
      res.json(JSON.parse(body));
    });
  });

module.exports = router;