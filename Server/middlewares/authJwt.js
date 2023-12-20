const jwt = require("jsonwebtoken");
const config = require('../config/authConfig');
const db = require('../models');
const User = db.user;
const Role = db.role;

// Vérifie l'authentification par jeton JWT

verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      console.log("Aucun token reçu!")
      return res.status(403).send({ message: "Aucun token reçu!" });
    }
  
    try { 
      const decoded = jwt.verify(token, config.secret);
      req.userId = decoded.id;
      next();
    } catch (err) {
      console.log(err)
      return res.status(401).send({message: "Opération non autorisée !"});
    }
  };
  
  isAdmin =  async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const role = await Role.find({ _id: { $in: user.role } });
      for (let i = 0; i < role.length; i++) {
        if (role[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Erreur : nécessite le statut d'administrateur!" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  };

  isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const role = await Role.find({ _id: { $in: user.role } });
      for (let i = 0; i < role.length; i++) {
        if (role[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Erreur : nécessite le statut de modérateur"});
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  };

  module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    authJwt: {
        verifyToken,
        isAdmin,
        isModerator
    }
};