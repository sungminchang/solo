var User = require('./userModel.js'),
    Q    = require('q');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = {user: user, secret: 'secret'};
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = {user: user, secret: 'secret'};
        res.json(token);
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = token;
      console.log("user token in CheckAuth function", token);
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(Error);
        });
    }
  },

  toggleFoods: function (req, res, next) {

    // console.log(req.body);

    var food = req.body;
    // var id =
    // console.log($window.localStorage.getItem('com.vitastats'));

    User.findOne({username: "test"}, function (err, user) { // HARD CODED
      // THE USERNAME IN. FIND A NEW WAY TO DO THIS SHIZ
      if (err) return handleError(err);

      // console.log('user:', user)
      // ;, 'food:', food);
      //
      //
      // for (var i = 0; i < user.foods.length; i++) {
      //   if (user.foods[i].name === food.name) {
      //     user.save(function (err) {
      //       if (err) return handleError(err);
      //       res.send(user);
      //     });        }
      // }

      user.foods.push(food);

      console.log(user)
      user.save(function (err) {
        if (err) return handleError(err);
        res.send(user);
      });
    });
  },

  retrieveStats: function(req, res, next) {
    User.findOne({username: "test"}, function(err, user) {
      if (err) return handleError(err);

      user.save(function(err) {
        if (err) return handleError(err);
        res.send(user);
      })

    })
  },

  resetStats: function(req, res, next) {
    User.findOne({username: "test"}, function(err, user) {
      if (err) return handleError(err);

      user.foods = [];
      user.save(function(err) {
        if (err) return handleError(err);
        res.send(user);
      })

    })
  }
};
