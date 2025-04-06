import type { ClassMeta } from "./class-meta";
import type { RequestMappingMeta } from "./request-mapping-meta";

export type ControllerMeta = Omit<ClassMeta, "declaration"> & {
  route: string;
  getMappings: RequestMappingMeta[];
  postMappings: RequestMappingMeta[];
  putMappings: RequestMappingMeta[];
  patchMappings: RequestMappingMeta[];
  deleteMappings: RequestMappingMeta[];
};
