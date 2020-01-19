const Category = require("../../models/category");

const { transformCategory } = require("../helper/helper");

module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return categories.map(category => {
        return transformCategory(category);
      });
    } catch (error) {
      throw error;
    }
  },
  createCategory: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    inputTitle = args.categoryInput.title.trim().toLowerCase();
    const category = new Category({
      title: inputTitle
    });

    try {
      const result = await category.save();
      return { ...result._doc };
    } catch (error) {
      throw error;
    }
  }
};
