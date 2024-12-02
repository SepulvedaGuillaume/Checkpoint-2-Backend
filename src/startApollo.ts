import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { CountryQueries } from './resolvers/CountryQueries';
import { CountryMutations } from './resolvers/CountryMutations';

export default async function startApolloServer() {
  const schema = await buildSchema({
    resolvers: [CountryQueries, CountryMutations]
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀  Server ready at: ${url}`);
}
