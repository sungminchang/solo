angular.module('vitastats', [
  'vitastats.services',
  'vitastats.foods',
  'vitastats.d3',
  'vitastats.stats',
  'vitastats.auth',
  'vitastats.directives',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/foods', {
      templateUrl: 'app/food/food.html',
      controller: 'FoodsController'
    })
    .when('/stats', {
      templateUrl: 'app/stats/stat.html',
      controller: 'StatsController'
    })
    .otherwise({
      templateUrl: 'app/stats/stats.html',
      controller: 'StatsController'
    });

    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.vitastats');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
