
const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/content/all",
    function(req, res) {
      res.send(controller.allAccess);
  });
};