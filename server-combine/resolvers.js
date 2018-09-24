const axios = require('axios');

module.exports = {

  Query: {
    frameworks: (_, __, ctx) => ctx.db.find()
  },

  Mutation: {
    addFramework: async (_, { name, git }, ctx) => {
      try {
        const url = git.split("https://github.com/")[1];
        const stars = await axios(`https://api.github.com/repos/${url}`);

        const framework = await new ctx.db({
          name,
          git,
          stars: stars.data.stargazers_count
        }).save();

        return framework;

      } catch(e) {
        throw new Error(e);
      }
    },
  }

};
