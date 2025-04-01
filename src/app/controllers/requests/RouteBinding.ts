import type { ParameterMeta } from "../../../parser/controllers/ParameterMeta.js";

export type RouteBinding = {
  route: string;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  action: Function;
  parameters: ParameterMeta[];
};
