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
        summonerInfo.getSummoner(name)
         .success( ( data ) => {
          // data recieved
          $scope.summoner = data;
          console.log(data);

          recentMatchInfo.getRecentMatch(data[name].id)
            .success( ( recentMatches ) => {
              $scope.recentMatch = recentMatches;
              console.log('recentMatch');

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