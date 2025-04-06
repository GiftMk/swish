import type { IoCContainer } from "@swish/ioc";
import type { ControllerMeta } from "@swish/metadata";
import { getControllerBindings } from "./get-controller-bindings";
import { registerRequests } from "./register-requests";
import type { SwishServer } from "@swish/server";

export const registerControllers = async (
  server: SwishServer,
  container: IoCContainer,
  controllers: ControllerMeta[]
) => {
  for (const controller of controllers) {
    const {
      getRequests,
      postRequests,
      putRequests,
      patchRequests,
      deleteRequests,
    } = await getControllerBindings(container, controller);

    registerRequests(server, "get", getRequests);
    registerRequests(server, "post", postRequests);
    registerRequests(server, "put", putRequests);
    registerRequests(server, "patch", patchRequests);
    registerRequests(server, "delete", deleteRequests);
  }
};
