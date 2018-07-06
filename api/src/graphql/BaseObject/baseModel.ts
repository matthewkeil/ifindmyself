import { generate } from "shortid";
import { SchemaDefinition, Document } from "mongoose";
import { ObjectId } from "mongodb";

import { DBRef, dbRef } from "../";

export interface BaseObject extends Document {
  _id: ObjectId;
  id: string; //shortid for URLs
  create: {
    by: DBRef;
    date: Date;
  };
}

export const baseDefinition: SchemaDefinition = {
  id: { type: String, default: generate(), required: true, unique: true },
  created: {
    by: dbRef("User"),
    at: { type: Date, default: Date.now() }
  }
};
