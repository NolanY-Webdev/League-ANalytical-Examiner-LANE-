'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    '$window',
    'summonerInfo',
    'recentMatchInfo',
    function($scope, $window, summonerInfo, recentMatchInfo) {
      $scope.getSummonerInfo = function(name) {
        summonerInfo.getSummoner(name)
         .success( ( data ) => {
          //data recieved
          $scope.summoner = data;
          console.log(data);

          recentMatchInfo.getRecentMatch(data[name].id)
            .success( (recentMatches) => {
              $scope.recentMatch = recentMatches;
              console.log(recentMatches);
            });
        });
      }
      // $window.location.href = '/#/getSummoner';
    }
]);