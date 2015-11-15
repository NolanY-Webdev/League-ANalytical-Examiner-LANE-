'use strict';
angular.module('laneApp')
  .controller('matchController', [
    '$scope',
    '$window',
    'matchInfo',
    '$rootScope',
    function($scope, $window, matchInfo, $rootScope) {
     $scope.mostRecentMatch = $rootScope.mostRecentMatch;
     $scope.summonerName = $rootScope.summonerName;
    }]);