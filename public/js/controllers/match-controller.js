'use strict';
angular.module('laneApp')
  .controller('matchController', [
    '$scope',
    '$window',
    'matchInfo',
    '$rootScope',
    '$stateParams',
    'summonerInfo',
    function($scope, $window, matchInfo, $rootScope, $stateParams, summonerInfo) {
     // $scope.mostRecentMatch = $rootScope.mostRecentMatch;
     // $scope.summonerName = $rootScope.summonerName;
     $scope.summoner = {};
     summonerInfo.getSummoner($stateParams.summoner_name)
         .success( ( data ) => {
          console.log(data);
          for(var key in data) {
            $scope.summoner = data[key];
          }
          console.log($scope.summoner);
          $scope.summonerName = $scope.summoner.name;
        });
    }]);