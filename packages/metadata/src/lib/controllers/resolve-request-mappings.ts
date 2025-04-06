import type { MethodDeclaration } from "ts-morph";
import type { RequestMappingMeta } from "../../types";
import { getDecoratorText } from "./get-decorator-text";
import { resolveParameters } from "./resolve-parameters";

export const resolveRequestMappings = (
  decoratorName: string,
  methods: MethodDeclaration[]
): RequestMappingMeta[] => {
  const getMappings: RequestMappingMeta[] = [];

  for (const method of methods) {
    const decorator = method.getDecorator(decoratorName);

    if (decorator) {
      const route = getDecoratorText(decorator);
      const name = method.getName();
      const parameters = resolveParameters(method);
      getMappings.push({ name, parameters, route });
    }
  }

  return getMappings;
};
