const db = require("../models");
const User = db.user;

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

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
  };
  
module.exports = verifySignUp;