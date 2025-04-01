import type { ControllerMeta } from "./ControllerMeta.js";
import { resolveMappings } from "./mappings/resolveMappings.js";
import type { ClassLookup } from "../ClassLookup.js";
import { Controller } from "../../decorators/Controller.js";
import { getDecoratorText } from "./getDecoratorText.js";

export const resolveControllers = (lookup: ClassLookup): ControllerMeta[] => {
  return lookup.controllers.map((meta) => {
    const { declaration, ...props } = meta;
    const decorator = declaration.getDecorator(Controller.name);

    if (!decorator) {
      throw new Error(
        `Class ${declaration.getName()} is not a controller. Missing controller decorator`
      );
    }

    const route = getDecoratorText(decorator);

    return {
      ...props,
      route,
      ...resolveMappings(meta.declaration),
    };
  });
};
