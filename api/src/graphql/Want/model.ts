import * as mongoose from "mongoose";
import { DBRef, dbRef, REF, baseDefinition, BaseObject } from "../";

export interface Want extends BaseObject {
  name: string;
  dimensions: DBRef[];
  needs: DBRef[];
}

export const WantSchemaDefinition: mongoose.SchemaDefinition = {
  ...baseDefinition,
  name: { type: String, required: true },
  dimensions: [dbRef(REF.DIMENSION)],
  needs: [dbRef(REF.NEED)]
};

export const WantSchema = new mongoose.Schema(WantSchemaDefinition);

export const WantModel = mongoose.model(REF.WANT, WantSchema);
