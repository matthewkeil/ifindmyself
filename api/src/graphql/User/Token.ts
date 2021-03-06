import { sign as _sign, verify as _verify } from "jsonwebtoken";
import { promisify } from "util";
const sign = promisify(_sign);
const verify = promisify(_verify);
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
