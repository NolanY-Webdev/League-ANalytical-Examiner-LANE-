'use strict';
angular.module('laneApp', [
'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function( $stateProvider, $urlRouteProvider) {

  $urlRouteProvider.otherwise('/');
  // $locationProvider.html5Mode(true);

//routes
  $stateProvider
  .state('default', {
    url : '/',
    controller : 'defaultController',
    templateUrl : 'views/default.html'
  })
  .state('match', {
    url : '/match/:summoner_name',
    controller : 'matchController',
    templateUrl : 'views/match.html'
  })
    .state('match.matchDetails', {
      url : '/match-details/:match_id',
      controller : 'matchDetailsController',
      templateUrl : 'views/match-details.html'
    })
    .state('match.recentMatch', {
      url : '/recent-match/:summoner_id',
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
  })
  .state('disclosure', {
    url : '/disclosure',
    templateUrl : 'views/disclosure.html'
  })
  .state('riot.txt', {
    url : '/riot.txt',
    templateUrl : 'views/riot.txt'
  });
}])
.run(['$rootScope', function($rootScope) {

}]);