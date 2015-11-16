'use strict';
angular.module('laneApp', [
'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouteProvider) {

$urlRouteProvider.otherwise('/');

//routes
  $stateProvider
  .state('default', {
    url : '/',
    controller : 'defaultController',
    templateUrl : 'views/default.html'
  })
  .state('match', {
    url : '/match',
    controller : 'matchController',
    templateUrl : 'views/match.html'
  })
    .state('match.lastMatch', {
      url : '/last-match',
      controller : 'matchController',
      templateUrl : 'views/last-match.html'
    })
    .state('match.recentMatch', {
      url : '/recent-match',
      controller : 'recentMatchController',
      templateUrl : 'views/recent-match.html'
    })
  .state('signup', {
    url : '/signup',
    templateUrl : 'views/signup.html'
  })
    .state('login', {
    url : '/login',
    templateUrl : 'views/login.html'
  });
}])
.run(['$rootScope', function($rootScope) {

}]);