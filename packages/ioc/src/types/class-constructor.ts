import type { ClassInstance } from "./class-instance";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ClassConstructor<T extends ClassInstance = {}> = {
  // biome-ignore lint/suspicious/noExplicitAny: can't know constructor arguments at build-time
  new (...args: any[]): T;
};
