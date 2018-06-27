import * as Jwt from "jsonwebtoken";
import { promisify } from "util";
const sign = promisify(Jwt.sign);
const verify = promisify(Jwt.verify);
import { ServerError } from "../../util";

interface Payload {
  id: string;
}
export class Token {
  private static secret = process.env.JWT_SECRET || "Get your OWN damn $ecret!";
  static sign = (payload: Payload) =>
    sign(payload, Token.secret).catch(
      ServerError("error signing jwt")
    ) as Promise<string>;
  static verify = (token: string) =>
    verify(token, Token.secret).catch(
      ServerError("error verifying jwt")
    ) as Promise<Payload>;
}
