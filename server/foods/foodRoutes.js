var foodController = require('./foodController.js');


module.exports = function (app) {
  // app === foodRouter injected from middlware.js
  app.post('/signin', foodController.signin);
  app.post('/signup', foodController.signup);
  app.get('/signedin', foodController.checkAuth);
};
