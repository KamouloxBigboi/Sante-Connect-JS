
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

  app.get("/api/content/user", 
    [authJwt.verifyToken], 
    function(req, res) {
      res.send(controller.userBoard);
  });

  app.get("/api/content/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    function(req, res) {
      res.send(controller.moderatorBoard);
    }
  );

  app.get(
    "/api/content/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    function(req, res) {
      res.send(controller.adminBoard);
    }
  );
};