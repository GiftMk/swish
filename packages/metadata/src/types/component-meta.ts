import type { ClassMeta } from "./class-meta";

export type ComponentMeta = Omit<ClassMeta, "declaration">;
