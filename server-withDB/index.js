require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const TaskRepo = require('./model');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.on('error', () => console.log('[Server] MongoDB Connection Error'));
mongoose.connection.once('open', () => console.log('[Server] MongoDB Connection Open'));

const typeDefs = gql`
  type Task {
    text: String
    completed: Boolean
  }

  type Query {
    tasks: [Task]
  }
`;

const resolvers = {
  Query: {
    tasks: () => TaskRepo.find()
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`[Server] Server ready at ${url}`);
});
