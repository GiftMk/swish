import type { ClassDeclaration } from "ts-morph";
import { Component } from "../decorators/Component.js";
import { Controller } from "../decorators/Controller.js";
import type { ClassType } from "./ClassMeta.js";

export const getClassType = (
  clazz: ClassDeclaration
): ClassType | undefined => {
  const classDecorators = clazz.getDecorators();

  if (
    classDecorators.some((decorator) => decorator.getName() === Controller.name)
  ) {
    return "controller";
  }

  if (
    classDecorators.some((decorator) => decorator.getName() === Component.name)
  ) {
    return "component";
  }
};
