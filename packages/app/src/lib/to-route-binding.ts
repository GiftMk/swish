import type { RequestMappingMeta } from "@swish/metadata";
import { getFullRoute } from "./get-full-route.js";
import type { RouteBinding } from "../types/route-binding.js";
import type { ClassInstance } from "@swish/ioc";

export const toRouteBinding = (
  instance: ClassInstance,
  baseRoute: string,
  mappingMeta: RequestMappingMeta
): RouteBinding => {
  const action = instance[mappingMeta.name];

  if (typeof action !== "function") {
    throw new Error("");
  }

  return {
    route: getFullRoute(baseRoute, mappingMeta.route),
    parameters: mappingMeta.parameters,
    action: action.bind(instance),
  };
};
