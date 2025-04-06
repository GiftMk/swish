import type { Decorator } from "ts-morph";

export const getDecoratorText = (decorator: Decorator): string => {
  const decoratorText = decorator.getArguments()[0]?.getText();
  return decoratorText?.slice(1, decoratorText.length - 1) ?? "";
};
