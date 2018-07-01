import { Token } from "./Token";
import { ApiError } from "../../util";

// @Collection("users")
export default class User {
  static fromToken = async (token: string): Promise<User | undefined> => {
    try {
      const { id } = await Token.verify(token);
      const user = { id }; //User.findBy({ id });
      return user;
    } catch (err) {
      new ApiError("Error deserializing token", { err });
    }
  };
}
