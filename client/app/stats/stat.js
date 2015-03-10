angular.module('vitastats.stats', [])

.controller('StatsController', function ($scope, Stats) {
  $scope.user = {};
  $scope.data = [
    {name: "Greg", score: 8},
    {name: "Ari", score: 6},
    {name: 'Q', score: 5},
    {name: "Loser", score: 48},
    {name: "Hello", score: 45},
    {name: "Hello", score: 35},
    {name: "Hello", score: 25},
    {name: "Hello", score: 15}
  ];
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
