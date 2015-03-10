angular.module('vitastats.stats', [])

.controller('StatsController', function ($scope, Stats) {
  $scope.user = {};
  $scope.user.foods = [];
  // [
  //   {vitamin: "A", percent: 8},
  //   {vitamin: "B", percent: 6},
  //   {vitamin: 'D', percent: 5},
  //   {vitamin: "Calcium", percent: 48},
  //   {vitamin: "Hello", percent: 45},
  //   {vitamin: "Hello", percent: 35},
  //   {vitamin: "Hello", percent: 25},
  //   {vitamin: "Hello", percent: 15}
  // ];
  $scope.predicate = '-visits';
  console.log("inside StatsController")

  $scope.retrieveStats = function() {
    console.log("trying to retrieve stats")
    Stats.retrieveStats()
      .then(function(data) {
        var foods = data.foods; // foods == array

        var result = [];
        var vitamins = {};

        for (var i = 0; i < foods.length; i++) {
          var food = foods[i]; // Object {name:..., vitamins:[{}, {}, ...]}

          var foodsVitamins = food.vitamins;

          for (var vitamin in foodsVitamins) {
            // console.log(foodsVitamins[vitamin])
            if (vitamins[vitamin] === undefined) {
              vitamins[vitamin] = foodsVitamins[vitamin];
            } else {
              vitamins[vitamin] += foodsVitamins[vitamin];
            }
          }
          console.log(food.name);
          // console.log(food.vitamins);
        }

        for (vitamin in vitamins) {
          result.push({vitamin: vitamin, percent: vitamins[vitamin]})
        }
        // console.log("RESULT",result)

        // for (var i = 0; i < result.length; i++) {
        //   varresult[i]
        // }
        // console.log(vitamins);
        $scope.user.vitamins = result;
        // console.log($scope.user.foods);
      })
      .catch(function(error) {
        console.error(error);
      });

  };

  $scope.retrieveStats();

});
