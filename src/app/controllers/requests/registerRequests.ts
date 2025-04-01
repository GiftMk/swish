import type { Express } from "express";
import type { RouteBinding } from "./RouteBinding.js";

type HttpMethod = "get" | "put" | "post" | "patch" | "delete";

export const registerRequests = (
  server: Express,
  method: HttpMethod,
  requests: RouteBinding[]
) => {
  for (const { route, action, parameters } of requests) {
    server[method](route, (req, res) => {
      const resolvedParameters = parameters.map((parameter) => {
        switch (parameter.type) {
          case "query":
            return req.query[parameter.key];
          case "body":
            return req.body;
          case "path":
            return req.params[parameter.name];
        }
      });

      const data = action(...resolvedParameters);

      if (typeof data === "object") {
        res.send(JSON.stringify(data));
      } else if (data) {
        res.send(data.toString());
      } else {
        res.send();
      }
    });
  }
};
