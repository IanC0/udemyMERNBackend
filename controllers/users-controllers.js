const uuid = require("uuid").v4;
const { validationResult } = require('express-validator')

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    userId: "u1",
    name: "Santa",
    email: "santa@north-pole.com",
    password: "red",
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if(hasUser){
    throw new HttpError("Could not create user, email already exists", 422)
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ DUMMY_USERS });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email == email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
