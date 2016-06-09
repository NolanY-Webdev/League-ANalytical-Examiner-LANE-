'use strict';
angular.module('laneApp')
  .controller('recentMatchController', [
    '$scope',
    'recentMatchInfo',
    'matchInfo',
    '$state',
    '$stateParams',
    function($scope, recentMatchInfo, matchInfo, $state, $stateParams) {
      recentMatchInfo.getRecentMatch($stateParams.summoner_id)
        .success((data) => {
          $scope.sortedData = data.sortedData;
          $scope.disableTab = $state;
          $scope.games = data.games;
          $scope.summonerName = 'TODO';
        });
      $scope.getMatch = function(gameId) {
        $state.go('match.matchDetails', {
          match_id : gameId
        });
      };
    }]);