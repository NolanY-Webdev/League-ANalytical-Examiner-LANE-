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
        };
    }
]);