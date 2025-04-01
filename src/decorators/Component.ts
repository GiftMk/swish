import type { Constructable } from "../ioc/ClassConstructor.js";
import type { InstanceScope } from "../ioc/InstanceScope.js";

export const Component = (scope: InstanceScope = "singleton") => {
  return <T extends Constructable>(target: T) => {};
};
