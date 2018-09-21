module.exports = {
  Query: {
    frameworks: (_, __, ctx) => ctx.db.find()
  },
  Mutation: {
    addFramework: async (_, { name, git }, ctx) => {
      try {
        const framework = await new ctx.db({name, git}).save();
        return framework;
      } catch(e) {
        throw new Error(e);
      }
    },
  }
};



