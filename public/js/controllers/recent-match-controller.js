'use strict';
angular.module('laneApp')
  .controller('recentMatchController', [
    '$scope',
    'recentMatchInfo',
    '$rootScope',
    'matchInfo',
    '$state',
    '$stateParams',
    function($scope, recentMatchInfo, $rootScope, matchInfo, $state, $stateParams) {
      recentMatchInfo.getRecentMatch($stateParams.summoner_id)
        .success((data) => {
          $scope.sortedData = data.sortedData;
          $scope.disableTab = $state;
          $scope.games = data.games;
          // $scope.gameLength = data.sortedData.gameLength / 60;

          // $scope.summonerName = $rootScope.summonerName;
          $scope.summonerName = 'TODO';
          console.log('games',data);
        });
      $scope.getMatch = function(gameId) {
        $state.go('match.matchDetails', {
          match_id : gameId
        });
      };
    }]);