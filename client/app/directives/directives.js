angular.module('vitastats.directives', ['vitaStats.d3'])
  .directive('barChart', ['d3', function(d3) {
    return {
        link: function(scope, element, attrs) {
            d3Service.d3().then(function(d3) {
              // d3 is the raw d3 object
            });
        }
    }
}]);