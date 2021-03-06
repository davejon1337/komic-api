import { ApolloServer } from 'apollo-server';
import { connect } from 'mongoose';
import { config } from 'dotenv';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({ req }),
});

(async () => {
  try {
    await connect(
      process.env.BUILD === 'DEV'
        ? 'mongodb://localhost:27017/komic'
        : process.env.DB_URI,
      { useNewUrlParser: true }
    );
    console.log('Connected to database');
  } catch (err) {
    console.log('Failed to connect to database.');
  }
  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`Server on : ${url}`);
})();
