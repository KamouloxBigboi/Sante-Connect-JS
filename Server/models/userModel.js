const mongoose = require("mongoose");

// Fonction email valide (regex)

let validateEmail = function(email) {
  const re = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
    return re.test(email);
};

const UserSchema = new mongoose.Schema({

    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [false, "Pour l'inscription, l'adresse email est requise"],
      validate: [validateEmail, " Merci d'inscrire un email valide "],
      match: [/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm]
  },

    password: {
      type: String,
      required: [true, "Tapez votre mot de passe"]
  },
   
    age: {
      type: Number,
      required: [true, "Pour t'inscrire sur cette appli, il faut avoir au moins 15 ans !"],
      min: 15
  },

    country: {
      type: String,
  },
});


const User = mongoose.model("user", UserSchema);

module.exports = User;