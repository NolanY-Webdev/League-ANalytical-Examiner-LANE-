'use strict';
angular.module('laneApp')
  .controller('matchController', [
    '$scope',
    '$window',
    'matchInfo',
    '$rootScope',
    function($scope, $window, matchInfo, $rootScope) {
      matchInfo.getMatch()
        .success((data) => {
          $scope.match = data;
          // $rootScope
        });
    }]);