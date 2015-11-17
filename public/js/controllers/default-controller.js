'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    'summonerInfo',
    'recentMatchInfo',
    'matchInfo',
    '$state',
    function($scope, summonerInfo, recentMatchInfo, matchInfo, $state) {
      $scope.getSummonerInfo = function(name) {
        $state.go('match', {
          summoner_name : name
        });
      };
    }
]);