import type { ClassConstructor } from "@swish/ioc";
import type { ClassMeta } from "@swish/metadata";

export const getTarget = async (
  classMeta: Omit<ClassMeta, "declaration">
): Promise<ClassConstructor> => {
  const module = await import(classMeta.importPath);
  return classMeta.isDefaultExport ? module : module[classMeta.className];
};
