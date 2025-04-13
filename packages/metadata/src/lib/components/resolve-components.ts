import type { ClassMeta } from "../../types";
import type { ClassLookup } from "../class-lookup";

export const resolveComponents = (lookup: ClassLookup): ClassMeta[] => {
  return lookup.components.map(({ declaration, ...props }) => props);
};
