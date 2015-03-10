var foodsController = require('./foodController.js');

module.exports = function (app) {
  // app === foodRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter on in
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navfood before it reaches line 16.

  app.route('/')
    .get(foodsController.allFoods)
    .post(foodsController.newFood);

  app.get('/toggle', foodsController.toggleFood);

};
