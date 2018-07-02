import * as mongoose from "mongoose";
import { DBRef, dbRef, REF, baseDefinition, BaseObject } from "../";

export interface Need extends BaseObject {
  name: string;
  dimensions: DBRef[];
  wants: DBRef[];
}

export const NeedSchemaDefinition: mongoose.SchemaDefinition = {
  ...baseDefinition,
  name: { type: String, required: true },
  dimensions: [dbRef(REF.DIMENSION)],
  wants: [dbRef(REF.WANT)]
};

export const NeedSchema = new mongoose.Schema(NeedSchemaDefinition);

export const NeedModel = mongoose.model(REF.NEED, NeedSchema);
