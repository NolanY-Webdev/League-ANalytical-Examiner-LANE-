'use strict';
angular.module('laneApp')
  .controller('matchController', [
    '$scope',
    '$state',
    'matchInfo',
    '$rootScope',
    '$stateParams',
    'summonerInfo',
    'recentMatchInfo',
   function($scope, $state, matchInfo, $rootScope, $stateParams, summonerInfo, recentMatchInfo) {
      // $scope.mostRecentMatch = $rootScope.mostRecentMatch;
      // $scope.summonerName = $rootScope.summonerName;
      $scope.summoner = {};
      summonerInfo.getSummoner($stateParams.summoner_name)
        .success( ( data ) => {
          // console.log('a string', $state)
          $scope.summonerName = $stateParams.summoner_name;
          $scope.disableTab = $state
          for (var key in data) {
            $scope.summoner = data[key];
          }
          recentMatchInfo.getRecentMatch($scope.summoner.id)
            .success( ( recentMatches ) => {
              $scope.recentMatch = recentMatches;
              $state.go('match.matchDetails', {
                match_id : $scope.recentMatch.games[0].gameId
              });
              // });
            });
        });
    }]);