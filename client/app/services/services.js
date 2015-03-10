angular.module('vitastats.services', [])

.factory('Foods', function ($http) {
  // Your code here



  var retrieveFoods = function() {
    return $http({
      method: 'GET',
      url: '/api/foods'
      // data:Food
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var toggleFoods = function(food) {
    return $http({
      method: 'POST',
      url: '/api/users/toggle',
      data: food
    })
    .then(function(resp) {
      resp.status = 201;
      return resp; // TAKE CARE OF THIS PROMISE
    });
  };

    return {
      retrieveFoods: retrieveFoods,
      toggleFoods: toggleFoods
    };

})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.vitastats'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.vitastats');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.vitastats');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
