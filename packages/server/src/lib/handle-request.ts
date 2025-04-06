import type { IncomingMessage, ServerResponse } from "node:http";
import type { RequestCallback } from "../types/request-callback";
import type { JSONResponse } from "../types/json-response";

export const handleRequest = (
  request: IncomingMessage,
  response: ServerResponse,
  requestMappings: Map<string, RequestCallback>
) => {
  const { url } = request;

  const callback = url && requestMappings.get(url);

  const jsonResponse: JSONResponse = callback
    ? callback(request, response)
    : { status: 404 };

  response.statusCode = jsonResponse.status ?? 200;
  response.setHeader("Content-Type", "application/json");

  response.write(jsonResponse.body ?? {});
  response.end();
};
