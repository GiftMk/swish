import { Component } from "@swish/decorators";
import type { Actor } from "./model/actor";
import { actors, directors, movies } from "./default-data";
import type { Director } from "./model/director";
import type { Movie } from "./model/movie";

@Component()
export class InMemoryDatabase {
  private readonly movies: Map<string, Movie>;
  private readonly directors: Map<string, Director>;
  private readonly actors: Map<string, Actor>;

  constructor() {
    this.actors = actors;
    this.movies = movies;
    this.directors = directors;
  }

  getMovies(): Movie[] {
    return [...this.movies.values()];
  }

  getMovieById(id: string): Movie | undefined {
    return this.movies.get(id);
  }

  getDirectors(): Director[] {
    return [...this.directors.values()];
  }

  getDirectorById(id: string): Director | undefined {
    return this.directors.get(id);
  }

  getActors(): Actor[] {
    return [...this.actors.values()];
  }

  getActorById(id: string): Actor | undefined {
    return this.actors.get(id);
  }

  addActor(actor: Actor) {
    this.actors.set(actor.id, actor);
  }

  deleteActor(id: string) {
    this.actors.delete(id);
  }
}
