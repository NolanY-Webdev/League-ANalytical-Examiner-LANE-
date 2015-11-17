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
          // console.log('data: ', data)
          $scope.games = data.games;
          // $scope.summonerName = $rootScope.summonerName;
          $scope.summonerName = 'TODO';
        });
      $scope.getMatch = function(gameId) {
        $state.go('match.matchDetails', {
          match_id : gameId
        });
      };
    }]);