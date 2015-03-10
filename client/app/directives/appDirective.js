angular.module('appApp.directives')
  .directive('d3Bars', ['d3', function(d3) {
    return {
        restrict: 'EA',
        scope: {},
        link: function(scope, element, attrs) {
            d3.d3().then(function(d3) {

            });
        }
    };
  }]);