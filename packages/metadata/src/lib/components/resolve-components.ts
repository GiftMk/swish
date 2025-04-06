import type { ComponentMeta } from "../../types";
import type { ClassLookup } from "../class-lookup";

export const resolveComponents = (lookup: ClassLookup): ComponentMeta[] => {
  return lookup.components.map(({ declaration, ...props }) => props);
};
