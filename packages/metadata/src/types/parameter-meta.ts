export type ParameterType = "query" | "body" | "path" | "request" | "response";

export type ParameterMeta = {
  type: ParameterType;
  name: string;
} & (
  | QueryParameterMeta
  | RequestBodyParameterMeta
  | PathVariableParameterMeta
  | RequestVariableMeta
  | ResponseVariableMeta
);

export type QueryParameterMeta = {
  type: "query";
  key?: string;
};

export type RequestBodyParameterMeta = {
  type: "body";
};

export type PathVariableParameterMeta = {
  type: "path";
};

export type RequestVariableMeta = {
  type: "request";
};

export type ResponseVariableMeta = {
  type: "response";
};
