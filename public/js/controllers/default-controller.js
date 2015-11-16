'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    '$window',
    'summonerInfo',
    'recentMatchInfo',
    'matchInfo',
    '$rootScope',
    function($scope, $window, summonerInfo, recentMatchInfo, matchInfo, $rootScope) {
      $scope.getSummonerInfo = function(name) {
        $rootScope.summonerName = name;
        summonerInfo.getSummoner(name)
         .success( ( data ) => {
          // data recieved
          $rootScope.summoner = data;
          $scope.summoner = data;

          recentMatchInfo.getRecentMatch(data[name].id)
            .success( ( recentMatches ) => {
              $rootScope.recentMatch = recentMatches;
              $scope.recentMatch = recentMatches;
              console.log('recentMatch: ', recentMatches);

              matchInfo.getMatch($scope.recentMatch.games[0].gameId)
                .success( ( mostRecentMatch ) => {
                  $rootScope.mostRecentMatch = mostRecentMatch;
                  $window.location.href = "/#/match";
                });

            });
        });
      };
    }
]);