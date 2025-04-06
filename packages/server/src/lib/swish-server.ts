import http from "node:http";
import type { RequestCallback } from "../types/request-callback";
import { handleRequest } from "./handle-request";
import type { HttpMethod } from "../types";

export class SwishServer {
  private readonly getMappings: Map<string, RequestCallback> = new Map();
  private readonly postMappings: Map<string, RequestCallback> = new Map();
  private readonly putMappings: Map<string, RequestCallback> = new Map();
  private readonly patchMappings: Map<string, RequestCallback> = new Map();
  private readonly deleteMappings: Map<string, RequestCallback> = new Map();

  get(route: string, callback: RequestCallback) {
    this.getMappings.set(route, callback);
  }

  post(route: string, callback: RequestCallback) {
    this.postMappings.set(route, callback);
  }

  put(route: string, callback: RequestCallback) {
    this.putMappings.set(route, callback);
  }

  patch(route: string, callback: RequestCallback) {
    this.patchMappings.set(route, callback);
  }

  delete(route: string, callback: RequestCallback) {
    this.deleteMappings.set(route, callback);
  }

  getRequestMappings(method: HttpMethod): Map<string, RequestCallback> {
    switch (method) {
      case "GET": {
        return this.getMappings;
      }
      case "POST": {
        return this.postMappings;
      }
      case "PUT": {
        return this.putMappings;
      }
      case "PATCH": {
        return this.patchMappings;
      }
      case "DELETE": {
        return this.deleteMappings;
      }
    }
  }

  start(port: number, callback: (error?: Error) => void) {
    const server = http.createServer((request, response) => {
      const method = request.method as HttpMethod;
      handleRequest(request, response, this.getRequestMappings(method));
    });

    server.listen(port, callback);
  }
}
