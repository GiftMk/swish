import type { Constructable } from "./ClassConstructor.js";
import type { InstanceScope } from "./InstanceScope.js";

export type ClassContext = {
  target: Constructable;
  dependencies: string[];
  scope: InstanceScope;
};
