import * as mongoose from "mongoose";
import { baseDefinition, BaseObject, dbRef, DBRef } from "../";

export interface Dimension extends BaseObject {
  name: string;
  primary: string;
  secondary: string;
  needs: DBRef[];
  wants: DBRef[];
}

export const DimensionSchemaDefinition: mongoose.SchemaDefinition = {
  ...baseDefinition,
  name: { type: String, required: true },
  primary: { type: String, required: true },
  secondary: { type: String, required: true },
  needs: [dbRef("Need")],
  wants: [dbRef("Want")]
};

export const DimensionSchema = new mongoose.Schema(DimensionSchemaDefinition);

export const DimensionModel = mongoose.model<Dimension>(
  "Dimension",
  DimensionSchema
);
