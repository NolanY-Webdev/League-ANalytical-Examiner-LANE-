'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    '$window',
    'summonerInfo',
    function($scope, $window, summonerInfo) {
      summonerInfo.getSummonerInfo()
        .success((data)=>{
          //data recieved
          $scope.summoner = data;
        });
      // $window.location.href = '/#/getSummoner';
    }
]);