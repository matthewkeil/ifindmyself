import { GraphModule } from "../";

import query from "./query";
import mutation from "./mutation";

export const NeedModule: GraphModule = {
  query,
  mutation
};

export * from "./types";
