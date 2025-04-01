import type { ClassInstance } from "./ClassInstance.js";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Constructable<T extends ClassInstance = {}> = {
  // biome-ignore lint/suspicious/noExplicitAny: can't know constructor arguments at build-time
  new (...args: any[]): T;
};
