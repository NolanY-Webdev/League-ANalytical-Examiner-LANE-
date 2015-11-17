'use strict';
angular.module('laneApp')
  .service('summonerInfo', [ '$http', function($http) {
    this.getSummoner = function(name) {
      return $http.get('http://localhost:3000/getSummoner?summonerName=' + name);
    };
  }])
  .service('recentMatchInfo', [ '$http', function($http) {
    this.getRecentMatch = function(summonerId) {
      return $http.get('http://localhost:3000/getRecentMatch?summonerId=' + summonerId);
    };
    this.getMatch = function(matchId) {
      return $http.get('http://localhost:3000/getMatch?matchId=' + matchId);
    };
  }])
  .service('matchInfo', [ '$http', function($http) {
    this.getMatch = function(matchId) {
      return $http.get('http://localhost:3000/getMatch?matchId=' + matchId);
    };
  }]);