import * as mongoose from "mongoose";
import { DBRef, dbRef, baseDefinition, BaseObject } from "../";

export interface Want extends BaseObject {
  name: string;
  dimensions: DBRef[];
  needs: DBRef[];
}

export const WantSchemaDefinition: mongoose.SchemaDefinition = {
  ...baseDefinition,
  name: { type: String, required: true },
  dimensions: [dbRef("Dimension")],
  needs: [dbRef("Need")]
};

export const WantSchema = new mongoose.Schema(WantSchemaDefinition);

export const WantModel = mongoose.model<Want>("Want", WantSchema);
