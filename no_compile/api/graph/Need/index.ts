import { SourceModule } from "../";

import query from "./query";
import mutation from "./mutation";

export const NeedModule: SourceModule = {
  query,
  mutation
};

export * from "./types";
