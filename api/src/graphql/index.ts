/**
 *
 *  GraphQL Schema
 *
 */
export { default as schema } from "./schema";

/**
 *
 * Base object definition
 *
 */
import * as mongodb from "mongodb";
export interface BaseObject {
  _id?: mongodb.ObjectId;
  id?: string; // URL shortid
  created: {
    by: DBRef;
    at?: Date;
  };
  added?: [
    {
      by: DBRef;
      at: Date;
    }
  ];
}
export { baseDefinition, baseFields } from "./BaseObject";

/**
 *
 * Defines SourceModule
 *
 */
import { GraphQLObjectTypeConfig } from "graphql";
export interface SourceModule<T> {
  query?: GraphQLObjectTypeConfig<T, Context>["fields"];
  mutation?: GraphQLObjectTypeConfig<T, Context>["fields"];
}
export namespace SourceModule {
  export type Query<T> = SourceModule<T>["query"];
  export type Mutation<T> = SourceModule<T>["mutation"];
}

/**
 *
 * database references
 *
 */
import * as mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
export enum REF {
  NEED = "Need",
  DIMENSION = "Dimension",
  WANT = "Want",
  USER = "User"
}
export type Ref = typeof REF[keyof typeof REF];
export interface DBRef {
  type: typeof ObjectId;
  ref: REF;
}
export function dbRef(ref: Ref): DBRef {
  return {
    type: ObjectId,
    ref
  };
}

// export interface DBREF<R extends Ref> extends DBRef {
//   namespace: R;
// }
// export const dbRef = <R extends Ref>(
//   namespace: R,
//   oid: ObjectId,
//   db: string = MONGO.DB_NAME
// ) => new DBRef(namespace, oid, db) as DBREF<R>;

/**
 *
 *  graphQL context
 *
 */
import { User } from "./User";
export interface Context {
  db: mongoose.Connection;
  user?: User;
  // neo: Neo4J.Session;
}
