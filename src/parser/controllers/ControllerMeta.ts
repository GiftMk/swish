import type { ClassMeta } from "../ClassMeta.js";
import type { RequestMappingMeta } from "./RequestMappingMeta.js";

export type ControllerMeta = Omit<ClassMeta, "declaration"> & {
  route: string;
  getMappings: RequestMappingMeta[];
  postMappings: RequestMappingMeta[];
  putMappings: RequestMappingMeta[];
  patchMappings: RequestMappingMeta[];
  deleteMappings: RequestMappingMeta[];
};
