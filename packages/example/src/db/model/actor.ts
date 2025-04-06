import type { entity } from "./entity";

export type Actor = entity & {
  firstName: string;
  lastName: string;
};
