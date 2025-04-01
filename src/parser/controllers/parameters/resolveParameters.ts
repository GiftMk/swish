import type { MethodDeclaration } from "ts-morph";
import type { ParameterMeta } from "../ParameterMeta.js";
import { Query } from "../../../decorators/Query.js";
import { Body } from "../../../decorators/Body.js";
import { getDecoratorText } from "../getDecoratorText.js";

export const resolveParameters = (
  method: MethodDeclaration
): ParameterMeta[] => {
  const parameters: ParameterMeta[] = [];

  for (const parameter of method.getParameters()) {
    const name = parameter.getName();

    const queryDecorator = parameter.getDecorator(Query.name);
    if (queryDecorator) {
      const key = getDecoratorText(queryDecorator);
      parameters.push({
        type: "query",
        name,
        key,
      });

      continue;
    }

    const bodyDecorator = parameter.getDecorator(Body.name);
    if (bodyDecorator) {
      parameters.push({
        type: "body",
        name,
      });

      continue;
    }

    parameters.push({
      type: "path",
      name,
    });
  }

  return parameters;
};
