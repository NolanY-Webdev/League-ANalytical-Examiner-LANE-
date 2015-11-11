'use strict';
angular.module('laneApp')
  .controller('recentMatchController', [
    '$scope',
    '$window',
    'recentMatchInfo',
    function($scope, $window, recentMatchInfo) {
      recentMatchInfo.getRecentMatchInfo()
        .success((data) => {
          $scope.recentMatch = data;
        });
    }]);