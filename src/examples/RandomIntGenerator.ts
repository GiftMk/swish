import { Component } from "../decorators/Component.js";

@Component()
export class RandomIntGenerator {
  generate(max = Number.POSITIVE_INFINITY) {
    return Math.floor(Math.random() * max);
  }
}
