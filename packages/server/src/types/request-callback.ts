import type { JSONResponse } from "./json-response";
import type { IncomingMessage, ServerResponse } from "node:http";

export type RequestCallback = (
  request: IncomingMessage,
  response: ServerResponse
) => JSONResponse;
