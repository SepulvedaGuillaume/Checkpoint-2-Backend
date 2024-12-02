import dataSource from './datasource';
import 'reflect-metadata';
import startApolloServer from './startApollo';

dataSource
  .initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error: unknown) => {
    console.error('Error connecting to the database', error);
  });

startApolloServer();
