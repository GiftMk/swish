import type { Express } from "express";
import { registerRequests } from "./requests/registerRequests.js";
import type { ControllerMeta } from "../../parser/controllers/ControllerMeta.js";
import type { IoCContainer } from "../../ioc/IoCContainer.js";
import { getControllerBindings } from "./getControllerBindings.js";

export const registerControllers = async (
  server: Express,
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
