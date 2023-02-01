const User = require("../models/User");
const CV = require("../models/cv");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hashSync(password, 10);
    const newUser = new User({ email, password: hash });
    newUser.save((err, user) => {
      if (err) {
        res.status(200).json(err);
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
        res.status(200).json({
          message: "user created",
          email: req.body.email,
          token,
          user,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (error, user) => {
      if (user == null) {
        res.status(500).send({ message: "user not found", error });
      }
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (error || !isMatch) {
          res.status(406).json({ message: "error" });
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
          let data = CV.find({
            _id: { $in: user.owned },
          }).then(() => {
            res.json({ email: req.body.email, token, data });
          });
        }
      });
    }
  );
};
