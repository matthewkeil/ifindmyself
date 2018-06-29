import { GraphQLObjectTypeConfig } from "graphql";
export { default as schema } from "./schema";
// import { Db } from "mongodb";
import { User } from "./User";
import * as mongoose from "mongoose";

export interface SourceModule {
  query?: GraphQLObjectTypeConfig<any, Context>["fields"];
  mutation?: GraphQLObjectTypeConfig<any, Context>["fields"];
}

export namespace SourceModule {
  export type Query = SourceModule["query"];
  export type Mutation = SourceModule["mutation"];
}

/**
 *
 * Define graphQL context
 *
 */
export interface Context {
  user?: User;
  db: mongoose.Connection;
  // neo: Neo4J.Session;
}
