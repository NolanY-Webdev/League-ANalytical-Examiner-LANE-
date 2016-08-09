'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    'summonerInfo',
    'recentMatchInfo',
    'matchInfo',
    '$state',
    function($scope, summonerInfo, recentMatchInfo, matchInfo, $state) {

      $scope.demoApp = function() {
        document.getElementById("summonerNameInput").value = 'mikey';
      };

      $scope.getSummonerInfo = function(name) {
        $state.go('match', {
          summoner_name : name
        });
      };
    }
]);
