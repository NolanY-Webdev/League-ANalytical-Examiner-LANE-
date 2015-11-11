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
  }])
  .service('matchInfo', [ '$http', function($http) {
    this.getMatch = function() {
      return $http.get('http://localhost:3000/getMatch');
    };
  }]);