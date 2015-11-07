'use strict';
angular.module('laneApp')
  .controller('defaultController', [
    '$scope',
    function($scope) {
      $scope.message = 'Welcome';
    }
]);