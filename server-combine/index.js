require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const FrameworkRepo = require('./model');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const context = { db: FrameworkRepo };

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.on('error', () => console.log('[Server] MongoDB Connection Error'));
mongoose.connection.once('open', () => console.log('[Server] MongoDB Connection Open'));

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  console.log(`[Server] Server ready at ${url}`);
});
