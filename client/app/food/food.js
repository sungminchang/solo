//Every time a user clicks on food item, toggles the food item
// in and out of the list of food

angular.module('vitastats.foods', [])

.controller('FoodsController', function ($scope, Foods) {
  // Your code here
  $scope.data = {};

  $scope.getFoods = function() {
    console.log("about to try to retrieveFoods from inside the getFoods function!")
    Foods.retrieveFoods()
      .then(function(data) {
        $scope.data.foods = data;
      })
      .catch(function(error) {
        console.error(error);
      });

  };

  $scope.toggleFoods = function(food) {
    console.log("inside togglefood", food);
    Foods.toggleFoods(food);
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
