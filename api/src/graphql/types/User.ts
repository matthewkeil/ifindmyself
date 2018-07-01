// import {
//   GraphQLString
//   GraphQLFieldConfig,
//   GraphQLOutputType,
//   isOutputType,
//   isInputType,
//   GraphQLArgumentConfig,
//   GraphQLFieldConfigArgumentMap,
//   GraphQLResolveInfo,
//   GraphQLObjectType,
//   GraphQLObjectTypeConfig
// } from "graphql";
// import { Context } from "../index";

import * as mongoose from "mongoose";

// import { Model } from "../../orm/Model";

const UserConfig: mongoose.SchemaDefinition = {
  // _id: mongoose.Schema.Types.ObjectId,
  created: { type: Number, default: Date.now },
  emails: [String],
  email: { type: String, get: (obj: any) => obj.emails[0] },
  tokens: [String],
  token: { type: String, get: (obj: any) => obj.tokens[0] },
  passwords: [String],
  password: { type: String, get: (obj: any) => obj.passwords[0] }
};

const UserOptions: mongoose.SchemaOptions = { collection: "users" };

/**
 **
 **
 **

 @Collection('users')
 class User extends GraphMongoDocument {
  _id: Types.ObjectId,
  created: { type: Types.Date, default: Date.now },
  emails: [Types.String],
  email: { type: Types.String, resolve: obj => obj.email[0] },
  tokens: [Types.String],
  token: { type: GraphQLString, resolve: obj => obj.tokens[0] },
  passwords: [Types.String],
  password: { type: Types.String, resolve: obj => obj.tokens[0] }

 }

 **
 **
 **
 */
