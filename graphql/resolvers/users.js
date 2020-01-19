const User = require("../../models/user");

const { transformUser } = require("../helper/helper");

module.exports = {
  users: async req => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const users = await User.find();
      return users.map(user => {
        return transformUser(user);
      });
    } catch (error) {
      throw error;
    }
  }
};
