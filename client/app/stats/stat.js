angular.module('vitastats.stats', [])

.controller('StatsController', function ($scope, Stats) {
  $scope.user = {};
  $scope.predicate = '-visits';
  console.log("inside StatsController")

  $scope.retrieveStats = function() {
    console.log("trying to retrieve stats")
    Stats.retrieveStats()
      .then(function(data) {
        $scope.user = data;
        console.log($scope.user);
      })
      .catch(function(error) {
        console.error(error);
      });

  };

  $scope.retrieveStats();

});
