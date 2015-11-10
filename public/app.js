angular.module('laneApp', [
'ngRoute'
]);

var laneApp = angular.module('laneApp');

laneApp.config( function($routeProvider) {

//routes
  $routeProvider
  .when('/', {
    controller : 'defaultController',
    templateUrl : 'views/default.html'
  })
  .when('/recent-match', {
    controller : 'recentMatchController',
    templateUrl : 'views/recent-match.html'
  })
  .when('/match', {
    controller : 'matchController',
    templateUrl : 'views/match.html'
  })
  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', function($rootScope) {

}]);