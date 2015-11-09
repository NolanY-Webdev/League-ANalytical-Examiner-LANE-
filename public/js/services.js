'use strict';
angular.module('laneApp')
  .service('summonerInfo', [ '$http', function($http) {
    this.getSummonerInfo = function() {
      console.log($http.get('http://localhost:3000/getSummoner'));
      return $http.get('http://localhost:3000/getSummoner');
    };

  }]);
  // .service('recentMatchInfo', []);