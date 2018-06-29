import { User } from "../graph/User";

const handleError = (err: ApiError) => {
  console.error(err);
};

/**
 *
 * function to handle promise based rejections
 */
// export const catchError = (
//   msg: string = "Server Error - caught but no additional information"
// ) => (err: Error): void => void new ApiError(msg, err);

interface ErrorConfig {
  msg?: string;
  err?: Error;
  user?: User;
}
export class ApiError extends Error {
  public user?: User;
  public err?: Error;
  constructor(msg: string = "", { err, user }: ErrorConfig = {}) {
    super(msg || "Server Error - no additional information");
    this.user = user;
    this.err = err;
    handleError(this);
  }
}

export const ServerError = (msg: string, config: ErrorConfig = {}) => (
  err: Error
): void => void new ApiError(msg, { ...config, err });
