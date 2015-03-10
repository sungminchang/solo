angular.module('vitastats.stats', [])

.controller('StatsController', function ($scope, $window, Stats) {
  $scope.user = {};
  $scope.user.foods = [];

  $scope.predicate = '-visits';
  console.log("inside StatsController")

  $scope.$on('rerender', function() {
    $scope.retrieveStats();
  });

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

})
.controller('FoodsController', function ($scope, Foods) {
  // Your code here
  $scope.data = {};

  $scope.getFoods = function() {
    console.log("about to try to retrieveFoods from inside the getFoods function!")
    Foods.retrieveFoods()
      .then(function(data) {
        console.log("sucessfully retrieved foods");
        $scope.data.foods = data;
      })
      .catch(function(error) {
        console.error(error);
      });

  };

  $scope.toggleFoods = function(food) {
    console.log("inside togglefood", food);
    Foods.toggleFoods(food);
    $scope.$emit('reRender');
  }

  $scope.getFoods();
})
.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.url.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        return result;

        // Took code from
        // http://code.ciphertrick.com/2015/02/07/live-search-using-custom-filter-in-angular-js/
    };
});
