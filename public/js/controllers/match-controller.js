'use strict';
angular.module('laneApp')
  .controller('matchController', [
    '$scope',
    '$window',
    'matchInfo',
    '$rootScope',
    function($scope, $window, matchInfo, $rootScope) {
      matchInfo.getMatchInfo()
        .success((data) => {
          $scope.match = data;
          // $rootScope
        });
    }]);