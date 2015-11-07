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
  .when('/default', {
    controller : 'defaultController',
    templateUrl : 'views/default.html'
  })
  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', function($rootScope) {

}]);