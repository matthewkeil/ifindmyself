/**
 *
 * dbRef, DBRef, Ref
 *
 */
import * as mongoose from "mongoose";
import { DBRef } from "mongodb";
import { Ref, RefMap } from "./schema";
export const dbRef = (ref: Ref) => ({
  type: mongoose.Schema.Types.ObjectId,
  ref
});
export { DBRef, Ref };

/**
 *
 * GraphQL Schema, context and Context
 *
 */
import { User } from "./User";
export type Context = RefMap & {
  user?: User;
};
export { schema, context } from "./schema";

/**
 *
 * SourceModules definition
 *
 */
import { GraphQLObjectTypeConfig } from "graphql";
import { ReferenceModule } from "./schema";
import { Document } from "mongoose";
export type SourceModule<T extends Document> = Partial<ReferenceModule<T>>;
export namespace SourceModule {
  export type Model<T extends Document> = ReferenceModule<T>["model"];
  export type Query<T extends Document> = ReferenceModule<T>["query"];
  export type Mutation<T extends Document> = ReferenceModule<T>["mutation"];
  export type Types = ReferenceModule<any>["types"];
}
export type FieldsMap<T extends Document> = GraphQLObjectTypeConfig<
  T,
  Context
>["fields"];

/**
 *
 * BaseObject, baseDefinition and baseFields
 *
 */
export * from "./BaseObject";
