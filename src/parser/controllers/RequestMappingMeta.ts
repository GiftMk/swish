import type { ParameterMeta } from "./ParameterMeta.js";

export type RequestMappingMeta = {
  name: string;
  route: string;
  parameters: ParameterMeta[];
};
