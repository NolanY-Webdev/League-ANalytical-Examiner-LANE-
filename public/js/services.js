'use strict';
angular.module('laneApp')
  .service('summonerInfo', [ '$http', function($http) {
    this.getSummonerInfo = function() {
      return $http.get('http://localhost:3000/getSummoner');
    };

  }])
  .service('recentMatchInfo', ['$http', function($http) {
    this.getRecentMatchInfo = function() {
      return $http.get('http://localhost:3000/getRecentMatch');
    };
  }])
  .service('MatchInfo', ['$http', function($http) {
    this.getMatchInfo = function() {
      return $http.get('http://localhost:3000/getMatch');
    };
  }]);