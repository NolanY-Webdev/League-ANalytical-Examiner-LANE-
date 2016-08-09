'use strict';
angular.module('laneApp')
  .service('summonerInfo', [ '$http', function($http) {
    this.getSummoner = function(name) {
      return $http.get('/getSummoner?summonerName=' + name);
    };
  }])
  .service('recentMatchInfo', [ '$http', function($http) {
    this.getRecentMatch = function(summonerId) {
      return $http.get('/getRecentMatch?summonerId=' + summonerId);
    };
  }])
  .service('matchInfo', [ '$http', function($http) {
    this.getMatch = function(matchId) {
      return $http.get('/getMatch?matchId=' + matchId);
    };
  }]);
