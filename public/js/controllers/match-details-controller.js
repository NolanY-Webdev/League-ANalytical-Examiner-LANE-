'use strict';
angular.module('laneApp')
  .controller('matchDetailsController', [
    '$scope',
    'matchInfo',
    '$state',
    '$stateParams',
    function($scope, matchInfo, $state, $stateParams) {
      $scope.mostRecentMatch = null;
      matchInfo.getMatch($stateParams.match_id)
        .success( ( mostRecentMatch ) => {
          console.log('MATCH INFO', mostRecentMatch);
          $scope.mostRecentMatch = mostRecentMatch;
        });
    }]);
