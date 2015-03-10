angular.module('vitastats', [
  'vitastats.services',
  'vitastats.foods',
  'vitastats.stats',
  'vitastats.auth',
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
.directive('d3Bars', ['d3', '$window', function(d3, $window) {
  return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

          d3.d3().then(function(d3) {
            var svg = d3.select(element[0])
              .append('svg')
              .style('width', '100%');

            // Browser onresize event
            window.onresize = function() {
              scope.$apply();
            };

            // Watch for resize event
            scope.$watch(function() {
              return angular.element($window)[0].innerWidth;
            }, function() {
              scope.render(scope.data);
            });

            scope.render = function(data) {
              svg.selectAll('*').remove();

              // If we don't pass any data, return out of the element
              if (!data) return;

              // setup variables
              var width = d3.select(element[0]).node().offsetWidth - margin,
                  // calculate the height
                  height = scope.data.length * (barHeight + barPadding),
                  // Use the category20() scale function for multicolor support
                  color = d3.scale.category20(),
                  // our xScale
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                      return d.percent;
                    })])
                    .range([0, width]);

              // set the height based on the calculations above
              svg.attr('height', height);

              //create the rectangles for the bar chart
              svg.selectAll('rect')
                .data(data).enter()
                  .append('rect')
                  .attr('height', barHeight)
                  .attr('width', 140)
                  .attr('x', Math.round(margin/2))
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d) { return color(d.percent); })
                  .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.percent);
                    });
              svg.selectAll('text')
                .data(data).enter()
                  .append('text')
                  .attr('fill', '#fff')
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 15;
                  })
                  .attr('x', 15)
                  .text(function(d) {
                    return d.vitamin + " " + d.percent + "%";
                  });


              // our custom d3 code
            }

          });
      }
  };
}])
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
