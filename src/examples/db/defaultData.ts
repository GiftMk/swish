import { v4 as uuidv4 } from "uuid";
import type { Actor } from "./Actor.js";
import type { Director } from "./Director.js";
import type { Movie } from "./Movie.js";

const giftId = uuidv4();
const graceId = uuidv4();
const gladId = uuidv4();
const mumId = uuidv4();
const dadId = uuidv4();
const forsakenPrinceId = uuidv4();
const bruceLeeFighterzId = uuidv4();

export const actors = new Map<string, Actor>([
  [giftId, { id: giftId, firstName: "Gift", lastName: "Mkwara" }],
  [graceId, { id: graceId, firstName: "Grace", lastName: "Mkwara" }],
  [gladId, { id: gladId, firstName: "Glad", lastName: "Mkwara" }],
]);

export const directors = new Map<string, Director>([
  [mumId, { id: mumId, firstName: "Lena", lastName: "Mkwara" }],
  [dadId, { id: dadId, firstName: "Bentry", lastName: "Mkwara" }],
]);

export const movies = new Map<string, Movie>([
  [
    forsakenPrinceId,
    {
      id: forsakenPrinceId,
      title: "Forsaken Prince",
      description: "Will the forsaken prince marries the poor village girl?",
      directorId: mumId,
      actorIds: [gladId, graceId],
    },
  ],
  [
    bruceLeeFighterzId,
    {
      id: bruceLeeFighterzId,
      title: "Bruce Lee Fighterz!",
      description: "Vladimir, Trump, Bruce Lee. Who will win?",
      directorId: dadId,
      actorIds: [gladId, giftId],
    },
  ],
]);
