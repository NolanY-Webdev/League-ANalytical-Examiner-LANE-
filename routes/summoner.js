'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

router
  .route('/')

  // get summoners id
  .get(function(req,res) {
    request.get({
      //api/lol/{region}/v1.4/summoner/by-name/{summonerNames}
      //TotallyNotKvothe
      //NativeHawaiian
      url : 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/ISheetOnYou?api_key=' + process.env.LOL_API_KEY
      // region: ,
      // summonerIds : 'ISheetOnYou',
      // api_key : process.env.LOL_API_KEY

      // match 2.2(na, matchId) includeTimeline true


    }, function(err, response, body) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(JSON.parse(body));
    });
  });

module.exports = router;