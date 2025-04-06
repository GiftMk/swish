import type { RouteBinding } from "../types/route-binding";
import type { SwishServer } from "@swish/server";

type HttpMethod = "get" | "put" | "post" | "patch" | "delete";

export const registerRequests = (
  server: SwishServer,
  method: HttpMethod,
  requests: RouteBinding[]
) => {
  for (const { route, action, parameters } of requests) {
    server[method](route, (request) => {
      // const resolvedParameters = parameters.map((parameter) => {
      //   switch (parameter.type) {
      //     case "query":
      //       return request.query[parameter.key];
      //     case "body":
      //       return request.body;
      //     case "path":
      //       return request.params[parameter.name];
      //   }
      // });

      const data = action();

      if (typeof data === "object") {
        return {
          body: JSON.stringify(data),
        };
      }

      if (data) {
        return {
          body: data.toString(),
        };
      }

      return {};
    });
  }
};
