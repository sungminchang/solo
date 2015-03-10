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
.factory('Stats', function ($http) {
  var retrieveStats = function() {
    return $http({
      method: 'GET',
      url: '/api/users/stats'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var resetStats = function() {
    console.log('made it into resetStats service function')
    return $http({
      method: 'GET',
      url: '/api/users/reset'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    retrieveStats: retrieveStats,
    resetStats: resetStats
  };
})
.factory('d3', ['$document', '$q', '$rootScope',
  function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {

          console.log(this.readyState)


      if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
      d3: function() { return d.promise; }
      };
  }]
)
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
