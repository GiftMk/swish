import type { RouteBinding } from "./requests/RouteBinding.js";

export type ControllerBindings = {
  getRequests: RouteBinding[];
  postRequests: RouteBinding[];
  putRequests: RouteBinding[];
  patchRequests: RouteBinding[];
  deleteRequests: RouteBinding[];
};
