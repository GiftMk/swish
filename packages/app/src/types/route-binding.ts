import type { ParameterMeta } from "@swish/metadata";

export type RouteBinding = {
  route: string;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  action: Function;
  parameters: ParameterMeta[];
};
