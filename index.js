const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

const GraphQLJSON = require("graphql-type-json");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers: { JSON: GraphQLJSON, ...resolvers }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
