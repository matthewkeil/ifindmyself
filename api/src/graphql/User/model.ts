import * as mongoose from "mongoose";
import { baseDefinition, BaseObject, REF, dbRef, DBRef } from "../";

export interface User extends BaseObject {
  emails: string[];
  passwords: string[];
  tokens: string[];
  needs: DBRef[];
  wants: DBRef[];
}

export const UserSchemaDefinition: mongoose.SchemaDefinition = {
  ...baseDefinition,
  emails: { type: [String], required: true },
  passwords: { type: [String], required: true },
  tokens: { type: [String], required: true },
  needs: [dbRef(REF.NEED)],
  wants: [dbRef(REF.WANT)]
};

export const UserSchema = new mongoose.Schema(UserSchemaDefinition);

UserSchema.virtual("email")
  .get(function() {
    // @ts-ignore: 'this' implicitly has type 'any'
    return this.emails[0];
  })
  .set(function(value: string) {
    // @ts-ignore: 'this' implicitly has type 'any'
    this.emails.unshift(value);
  });

UserSchema.virtual("password")
  .get(function() {
    // @ts-ignore: 'this' implicitly has type 'any'
    return this.passwords[0];
  })
  .set(function(value: string) {
    // @ts-ignore: 'this' implicitly has type 'any'
    this.passwords.unshift(value);
  });

UserSchema.virtual("token")
  .get(function() {
    // @ts-ignore: 'this' implicitly has type 'any'
    return this.tokens[0];
  })
  .set(function(value: string) {
    // @ts-ignore: 'this' implicitly has type 'any'
    this.tokens.unshift(value);
  });

export const UserModel = mongoose.model(REF.USER, UserSchema);

// @Collection("users")
// export default class User {
//   static fromToken = async (token: string): Promise<User | undefined> => {
//     try {
//       const { id } = await Token.verify(token);
//       const user = { id }; //User.findBy({ id });
//       return user;
//     } catch (err) {
//       new ApiError("Error deserializing token", { err });
//     }
//   };
// }
