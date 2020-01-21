const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  signUp: async args => {
    inputFullname = args.userInput.fullname.trim();
    inputEmail = args.userInput.email.trim().toLowerCase();
    inputPassword = args.userInput.password.trim();

    try {
      if (inputFullname === "" || inputFullname == null) {
        throw new Error("Fullname is required");
      }

      if (inputEmail === "" || inputEmail == null) {
        throw new Error("Email is required");
      }

      if (inputPassword === "" || inputPassword == null) {
        throw new Error("Password is required");
      }

      const data = await User.findOne({ email: inputEmail });

      if (data) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bycrypt.hash(inputPassword, 10);
      const user = new User({
        fullname: inputFullname,
        email: inputEmail,
        password: hashedPassword
      });

      const result = await user.save();

      const message = `${inputEmail} successfully registered`;

      // return { ...result._doc, _id: result.id, message: message };
      const token = jwt.sign(
        { userId: result._id, email: result.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        message: message,
        userId: user._id,
        token: token,
        tokenExpiration: 1
      };
    } catch (error) {
      throw error;
    }
  },
  sign: async args => {
    email = args.email.trim().toLowerCase();
    password = args.password.trim();

    try {
      if (email === "" || email == null) {
        throw new Error("Email is required");
      }

      if (password === "" || password == null) {
        throw new Error("Password is required");
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("You are not registered!");
      }

      const isEqual = await bycrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      const message = `successfully to login`;

      return {
        message: message,
        userId: user._id,
        token: token,
        tokenExpiration: 1
      };
    } catch (error) {
      throw error;
    }
  }
};
