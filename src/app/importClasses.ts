import type { ClassMeta } from "../parser/ClassMeta.js";
import type { ClassContext } from "../ioc/ClassContext.js";
import { getTarget } from "./getTarget.js";

export const importClasses = async (
  classes: Omit<ClassMeta, "declaration">[]
): Promise<ClassContext[]> => {
  const contexts: ClassContext[] = [];

  for (const clazz of classes) {
    contexts.push({
      target: await getTarget(clazz),
      dependencies: clazz.dependencies,
      scope: "prototype",
    });
  }

  return contexts;
};
