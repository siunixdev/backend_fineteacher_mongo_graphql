const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  signUp: async args => {
    inputEmail = args.userInput.email.trim().toLowerCase();
    inputPassword = args.userInput.password.trim();

    try {
      const data = await User.findOne({ email: inputEmail });

      if (data) {
        throw new Error("User exists already");
      }

      const hashedPassword = await bycrypt.hash(inputPassword, 10);
      const user = new User({
        email: inputEmail,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
  sign: async args => {
    email = args.email.trim().toLowerCase();
    password = args.password.trim();

    try {
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

      return {
        userId: user._id,
        token: token,
        tokenExpiration: 1
      };
    } catch (error) {
      throw error;
    }
  }
};
