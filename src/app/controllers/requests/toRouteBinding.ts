import type { ClassInstance } from "../../../ioc/ClassInstance.js";
import type { RequestMappingMeta } from "../../../parser/controllers/RequestMappingMeta.js";
import { getFullRoute } from "./getFullRoute.js";
import type { RouteBinding } from "./RouteBinding.js";

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
