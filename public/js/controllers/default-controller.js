'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    '$window',
    'summonerInfo',
    'recentMatchInfo',
    'matchInfo',
    '$rootScope',
    '$state',
    function($scope, $window, summonerInfo, recentMatchInfo, matchInfo, $rootScope, $state) {
      $scope.getSummonerInfo = function(name) {
        $state.go('match', {
          summoner_name : name
        });

          // recentMatchInfo.getRecentMatch(data[name].id)
          //   .success( ( recentMatches ) => {
          //     $rootScope.recentMatch = recentMatches;
          //     $scope.recentMatch = recentMatches;

              // matchInfo.getMatch($scope.recentMatch.games[0].gameId)
              //   .success( ( mostRecentMatch ) => {
              //     $scope.mostRecentMatch = mostRecentMatch;
              //     $window.location.href = "/#/match";
              //   });
            // });
        };
    }
]);