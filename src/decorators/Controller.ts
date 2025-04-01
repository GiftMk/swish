import type { Constructable } from "../ioc/ClassConstructor.js";

export const Controller = (baseRoute = "") => {
  return <T extends Constructable>(target: T) => {};
};
