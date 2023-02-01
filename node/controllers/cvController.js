const CV = require("../models/cv");
const User = require("../models/User");

exports.add = (req, res) => {
  const NewCV = new CV(req.body);
  console.log(req.body);
  User.findOneAndUpdate(
    {
      email: req.params.email,
    },
    { $push: { message: "id saved", owned: NewCV._id } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
    }
  );
  NewCV.save((error, cv) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({ message: "cv created", cv });
    }
  });
};

exports.delete = (req, res) => {
  CV.findByIdAndDelete(req.body._id)
    .then((cv) => {
      if (!cv) {
        res.status(500).json({ message: "cv doesn't exist" });
      } else {
        res.status(200).json({ message: "cv deleted" });
      }
    })
    .catch((err) => console.log(err));
};

exports.list = (req, res) => {
  CV.find()
    .then((list) => {
      if (!list) {
        res.status(500).json({ message: "no list" });
      } else {
        console.log(list);
        res.status(200).json({ message: "list found", list: list });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.edit = (req, res) => {
  console.log(req.body);
  CV.findByIdAndUpdate(req.body._id, req.body)
    .then((cv) => {
      if (!cv) {
        res.status(500).json({ message: "cv doesn't exist" });
      } else {
        res.status(200).json({ message: "cv updated", cv });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
