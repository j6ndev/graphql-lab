const { gql } = require('apollo-server');

module.exports = gql`
  type Framework {
    id: String
    name: String
    description: String
    avatar: String
    git: String
    stars: Int
  }

  type Query {
    frameworks: [Framework]
  }

  type Mutation {
    addFramework(name: String, git: String): Framework
  }
`;
