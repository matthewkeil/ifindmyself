import * as mongoose from "mongoose";
import { baseDefinition, BaseObject, dbRef, DBRef } from "../";

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
  needs: [dbRef("Need")],
  wants: [dbRef("Want")]
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

export const UserModel = mongoose.model<User>("User", UserSchema);

console.log(UserSchema);
