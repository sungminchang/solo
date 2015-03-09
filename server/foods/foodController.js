var Food    = require('./foodModel.js'),
    Q       = require('q');
    // util    = require('../config/utils.js');


module.exports = {
  findUrl: function (req, res, next, code) {
    var findFood = Q.nbind(Food.findOne, Food);
    findFood({code: code})
      .then(function (food) {
        if (food) {
          req.navFood = food;
          next();
        } else {
          next(new Error('Food not added yet'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  allFoods: function (req, res, next) {
  var findAll = Q.nbind(Food.find, Food);

  findAll({})
    .then(function (foods) {
      res.json(foods);
    })
    .fail(function (error) {
      next(error);
    });
  },

  newFood: function (req, res, next) {
    // console.log('made it to newFood');
    // console.log(req.body)
    var url = req.body.food;
    console.log(req.body);
    // if (!util.isValidUrl(url)) {
    //   return next(new Error('Not a valid food'));
    // }

    var createFood = Q.nbind(Food.create, Food);
    var findFood = Q.nbind(Food.findOne, Food);

    findFood({url: url})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return url // util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newFood = {
            url: url,
            visits: 0,
            base_url: req.headers.origin,
            title: title
          };
          return createFood(newFood);
        }
      })
      .then(function (createdFood) {
        if (createdFood) {
          res.json(createdFood);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  navToFood: function (req, res, next) {
    var food = req.navFood;
    food.visits++;
    food.save(function (err, savedFood) {
      if (err) {
        next(err);
      } else {
        res.redirect(savedFood.url);
      }
    });
  }

};
