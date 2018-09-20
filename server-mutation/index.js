require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const TaskRepo = require('./model');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.on('error', () => console.log('[Server] MongoDB Connection Error'));
mongoose.connection.once('open', () => console.log('[Server] MongoDB Connection Open'));

const typeDefs = gql`
  type Task {
    id: ID!
    text: String
    completed: Boolean
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(text: String): Task
    removeTask(id: ID): Task
  }
`;

const resolvers = {
  Query: {
    tasks: () => TaskRepo.find()
  },
  Mutation: {
    addTask: async (_, { text }) => {
      try {
        const task = await new TaskRepo({text}).save();
        return task;
      } catch(e) {
        throw new Error(e);
      }
    },
    removeTask: async (_, { id }) => {
      try {
        const deletedTask = TaskRepo.findOneAndDelete({_id: id});
        return deletedTask;
      } catch(e) {
        throw new Error(e);
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`[Server] Server ready at ${url}`);
});
