module.exports.allAccess = (req, res) => {
  res.status(200).send("all");
  };
  
module.exports.userBoard = (req, res) => {
  res.status(200).send("user");
};