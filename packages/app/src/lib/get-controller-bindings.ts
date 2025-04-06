import type { ControllerBindings } from "../types/controller-bindings";
import { toRouteBinding } from "./to-route-binding";
import type { IoCContainer } from "@swish/ioc";
import type { ControllerMeta } from "@swish/metadata";

export const getControllerBindings = async (
  container: IoCContainer,
  controllerMeta: ControllerMeta
): Promise<ControllerBindings> => {
  const instance = container.resolve(controllerMeta.className);

  return {
    getRequests: controllerMeta.getMappings.map((mapping) =>
      toRouteBinding(instance, controllerMeta.route, mapping)
    ),
    postRequests: controllerMeta.postMappings.map((mapping) =>
      toRouteBinding(instance, controllerMeta.route, mapping)
    ),
    putRequests: controllerMeta.putMappings.map((mapping) =>
      toRouteBinding(instance, controllerMeta.route, mapping)
    ),
    patchRequests: controllerMeta.patchMappings.map((mapping) =>
      toRouteBinding(instance, controllerMeta.route, mapping)
    ),
    deleteRequests: controllerMeta.deleteMappings.map((mapping) =>
      toRouteBinding(instance, controllerMeta.route, mapping)
    ),
  };
};
