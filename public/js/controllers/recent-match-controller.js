'use strict';
angular.module('laneApp')
  .controller('recentMatchController', [
    '$scope',
    '$window',
    'recentMatchInfo',
    '$rootScope',
    'matchInfo',
    function($scope, $window, recentMatchInfo, $rootScope, matchInfo) {
      recentMatchInfo.getRecentMatch($rootScope.summoner[$rootScope.summonerName].id)
        .success((data) => {
          // console.log('data: ', data)
          $scope.games = data.games;
          $scope.summonerName = $rootScope.summonerName;
        });

      $scope.getMatch = function(gameId) {
        console.log(gameId);
        matchInfo.getMatch(gameId)
          .success( ( mostRecentMatch ) => {
            $rootScope.mostRecentMatch = mostRecentMatch;
            $window.location.href = "/#/match";
          });
      }
    }]);