/**
 *
 * Define graphQL context
 *
 */
import { User } from "./User";
import * as mongoose from "mongoose";
export interface Context {
  user?: User;
  db: mongoose.Connection;
  // neo: Neo4J.Session;
}

/**
 *
 * REF, Ref, DBRef, dbRef
 *
 */
import { ObjectId, DBRef } from "mongodb";
export { DBRef };
export enum REF {
  WANT = "Want",
  NEED = "Need",
  DIMENSION = "Dimension",
  USER = "User"
}
export type Ref = typeof REF[keyof typeof REF];
export const dbRef = (ref: Ref) => ({
  type: mongoose.Schema.Types.ObjectId,
  ref
});
/**
 *
 * BaseObject, baseDefinition and baseFields
 *
 */
export * from "./BaseObject";
export interface BaseObject {
  _id: ObjectId;
  id: string; //shortid for URLs
  create: {
    by: DBRef;
    date: Date;
  };
}

/**
 *
 * SourceModules definition
 *
 */
import { GraphQLObjectTypeConfig, GraphQLSchemaConfig } from "graphql";
export interface SourceModule {
  query?: GraphQLObjectTypeConfig<any, Context>["fields"];
  mutation?: GraphQLObjectTypeConfig<any, Context>["fields"];
  types?: GraphQLSchemaConfig["types"];
}
export namespace SourceModule {
  export type Query = SourceModule["query"];
  export type Mutation = SourceModule["mutation"];
  export type Types = SourceModule["types"];
}

/**
 *
 * GraphQL Schema
 *
 */
export { default as schema } from "./schema";
