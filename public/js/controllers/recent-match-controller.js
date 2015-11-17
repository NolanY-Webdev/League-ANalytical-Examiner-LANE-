'use strict';
angular.module('laneApp')
  .controller('recentMatchController', [
    '$scope',
    '$window',
    'recentMatchInfo',
    '$rootScope',
    'matchInfo',
    '$state',
    '$stateParams',
    function($scope, $window, recentMatchInfo, $rootScope, matchInfo, $state, $stateParams) {
      recentMatchInfo.getRecentMatch($stateParams.summoner_id)
        .success((data) => {
          // console.log('data: ', data)
          $scope.games = data.games;
          // $scope.summonerName = $rootScope.summonerName;
          $scope.summonerName = 'TODO';
        });
      $scope.getMatch = function(gameId) {
        recentMatchInfo.getMatch(gameId)
          .success( ( mostRecentMatch ) => {
            console.log('THiS========', mostRecentMatch);
            $scope.mostRecentMatch = mostRecentMatch;
            $state.go('match.matchDetails');
          });
      }
    }]);