import { Schema } from "mongoose";

export default new Schema({
  id: String,
  created: Number,
  emails: [String],
  passwords: [String],
  tokens: [String]
});

export interface UserSchema {
  id: string;
  created: number;
  emails: string[];
  passwords: string[];
  tokens: string[];
}
