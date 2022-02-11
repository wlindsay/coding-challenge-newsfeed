import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';
import { UserResolver } from './resolvers/user-resolver';
import { ProjectResolver } from './resolvers/project-resolver';

const schema = buildSchemaSync({
  resolvers: [UserResolver, ProjectResolver],
  container: Container
});
export const server = new ApolloServer({ schema });
