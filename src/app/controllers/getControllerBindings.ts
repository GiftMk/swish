import type { IoCContainer } from "../../ioc/IoCContainer.js";
import type { ControllerMeta } from "../../parser/controllers/ControllerMeta.js";
import type { ControllerBindings } from "./ControllerBindings.js";
import { toRouteBinding } from "./requests/toRouteBinding.js";

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
