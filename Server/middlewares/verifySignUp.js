const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({ username: req.body.username }).exec();
    if (userByUsername) {
      return res.status(400).send({ message: "Erreur! Compte déjà existant avec ce nom d'utilisateur!" });
    }

    const userByEmail = await User.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      return res.status(400).send({ message: "Compte déjà existant avec cet Email !" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    for (let i = 0; i < req.body.role.length; i++) {
      if (!ROLES.includes(req.body.role[i])) {
        console.log(message)
        return Promise.reject({
          status: 400,
          message: `Erreur! Le statut de ${req.body.role[i]} n'existe pas!`
        });
      }
    }
  }
  return Promise.resolve();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  
module.exports = verifySignUp;