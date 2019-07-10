const UserModel = require("../models/User");
const path = require("path");
const encryption = require("../util/encription");
const jwt = require("jsonwebtoken");
const atob = require("atob");

module.exports = {
  registerGet: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/user/register.html"));
  },
  registerPost: (req, res) => {
    let { email, password, username } = req.body;
    //we return base64 string to normal string
    email = atob(`${email}`);
    password = atob(`${password}`);
    username = atob(`${username}`);
    //we create salt and hashed password to be store in the DB
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, password);
    UserModel.create({
      email,
      hashedPassword,
      username,
      salt
    })
      .then(user => {
        //we create a token which we send to the front-end

        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString()
          },
          "secretword",
          { expiresIn: "2h" }
        );
        res.status(201).json({
          message: "User created!",
          email: user.email,
          userId: user._id,
          token,
          username: user.username
        });
      })
      .catch(error => {
        res.status(409).json({
          message: "The user already exists"
        });
        console.log(
          `This is an error from attempting to register a user: ${error}`
        );
      });
  },
  //we send the requested files
  loginGet: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/user/login.html"));
  },

  login: (req, res) => {
    let { email, password } = req.body;
    password = atob(`${password}`);
    email = atob(`${email}`);
    UserModel.findOne({ email: email })
      .then(user => {
        //here we check if there is such an user in DB
        if (!user) {
          const error = new Error("No such user in DB!");
          error.statusCode = 401;
          res.status(401).json({
            message: "There is no such user!"
          });
          throw error;
        }
        //here we call the method autenticate that is attached to the returned result and we provide the password to check if the password match
        if (!user.authenticate(password)) {
          const error = new Error("Wrong password!");
          error.statusCode = 401;
          res.status(401).json({
            message: "You've entered wrong password!"
          });
          throw error;
        }
        //here we send a token to the front-end and some other info
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString()
          },
          "secretword",
          { expiresIn: "2h" }
        );
        res.status(200).json({
          message: "User successfully logged in!",
          email: user.email,
          token,
          userId: user._id.toString(),
          username: user.username
        });
      })
      .catch(error => {
        console.log(error);
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  }
};
