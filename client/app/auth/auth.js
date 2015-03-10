angular.module('vitastats.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.error = {};

  $scope.signin = function () {
    console.log("made it to the signin function")
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.vitastats', token);
        $location.path('/stats');
      })
      .catch(function (error) {
        console.error(error);
        $scope.error.message = error.data.error;
      });
  };

  $scope.signup = function () {
    console.log("made it to the signup function")
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.vitastats', token);
        $location.path('/stats');
      })
      .catch(function (error) {
        console.error(error);
        $scope.error.message = error.data.error;
      });
  };

  console.log("made it to Authocontroller!");
});
