'use strict';
angular.module('laneApp')
  .controller('recentMatchController', [
    '$scope',
    '$window',
    'matchInfo',
    function($scope, $window, summonerInfo) {
      matchInfo.getMatchInfo()
        .success((data) => {
          $scope.match = data;
        });
    }]);