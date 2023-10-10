const asyncHandler = require("express-async-handler");
let User = require("../models/UserModel");
const genrateWebToken = require("../utils/genratetoken");
const fs = require("fs");
const path = require("path");

// Define the maximum size for uploading
// picture i.e. 1 MB.
const maxSize = 1 * 1000 * 1000;

exports.userAdd = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const UserExists = await User.findOne({ email });
  if (UserExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  // console.log("useradd", req.file, req.body.pic, req.files, req.body);

  const user = await User.create({
    name,
    email,
    password,
  });
  user.save();
  // let respond = await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: genrateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: genrateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email And Password");
  }
});

exports.updateuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("user", user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: genrateWebToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
