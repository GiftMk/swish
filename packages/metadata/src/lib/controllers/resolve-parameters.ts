import { Query, Body, Req, Res } from "@swish/decorators";
import type { MethodDeclaration } from "ts-morph";
import type { ParameterMeta } from "../../types";
import { getDecoratorText } from "./get-decorator-text";

export const resolveParameters = (
  method: MethodDeclaration
): ParameterMeta[] => {
  const parameters: ParameterMeta[] = [];

  for (const parameter of method.getParameters()) {
    const name = parameter.getName();

    const queryDecorator = parameter.getDecorator(Query.name);
    if (queryDecorator) {
      const decoratorText = getDecoratorText(queryDecorator);
      parameters.push({
        type: "query",
        name,
        key: decoratorText.length ? decoratorText : undefined,
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

    const requestDecorator = parameter.getDecorator(Req.name);
    if (requestDecorator) {
      parameters.push({
        type: "request",
        name,
      });

      continue;
    }

    const responseDecorator = parameter.getDecorator(Res.name);
    if (responseDecorator) {
      parameters.push({
        type: "response",
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
