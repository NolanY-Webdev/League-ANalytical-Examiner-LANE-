'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    '$window',
    'summonerInfo',
    'recentMatchInfo',
    'matchInfo',
    function($scope, $window, summonerInfo, recentMatchInfo, matchInfo) {
      $scope.getSummonerInfo = function(name) {
        summonerInfo.getSummoner(name)
         .success( ( data ) => {
          //data recieved
          $scope.summoner = data;
          console.log(data);

          recentMatchInfo.getRecentMatch(data[name].id)
            .success( ( recentMatches ) => {
              $scope.recentMatch = recentMatches;
              // console.log(recentMatches);

              matchInfo.getMatch(recentMatches.games[0].gameId)
                .success( ( mostRecentMatch ) => {
                  $scope.mostRecentMatch = mostRecentMatch;
                  console.log(mostRecentMatch);
              });
            });
        });
      };
    }
      // $window.location.href = '/#/getSummoner';
]);