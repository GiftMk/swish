import type { ClassContext } from "@swish/ioc";
import { getTarget } from "./get-target.js";
import type { ClassMeta } from "@swish/metadata";

export const importClasses = async (
  classes: Omit<ClassMeta, "declaration">[]
): Promise<ClassContext[]> => {
  const contexts: ClassContext[] = [];

  for (const clazz of classes) {
    contexts.push({
      target: await getTarget(clazz),
      dependencies: clazz.dependencies,
    });
  }

  return contexts;
};
