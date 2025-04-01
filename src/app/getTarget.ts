import type { Constructable } from "../ioc/ClassConstructor.js";
import type { ClassMeta } from "../parser/ClassMeta.js";

export const getTarget = async (
  classMeta: Omit<ClassMeta, "declaration">
): Promise<Constructable> => {
  const module = await import(classMeta.importPath);
  return classMeta.isDefaultExport ? module : module[classMeta.className];
};
