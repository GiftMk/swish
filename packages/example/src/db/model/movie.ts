import type { entity } from "./entity";

export type Movie = entity & {
  title: string;
  description: string;
  directorId: string;
  actorIds: string[];
};
