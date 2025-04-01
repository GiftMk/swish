import type { ClassDeclaration } from "ts-morph";
import { resolveRequestMappings } from "./resolveRequestMappings.js";
import { Get } from "../../../decorators/Get.js";
import { Post } from "../../../decorators/Post.js";
import { Put } from "../../../decorators/Put.js";
import { Delete } from "../../../decorators/Delete.js";
import { Patch } from "../../../decorators/Patch.js";

export const resolveMappings = (clazz: ClassDeclaration) => {
  const methods = clazz.getMethods();

  return {
    getMappings: resolveRequestMappings(Get.name, methods),
    postMappings: resolveRequestMappings(Post.name, methods),
    putMappings: resolveRequestMappings(Put.name, methods),
    patchMappings: resolveRequestMappings(Patch.name, methods),
    deleteMappings: resolveRequestMappings(Delete.name, methods),
  };
};
