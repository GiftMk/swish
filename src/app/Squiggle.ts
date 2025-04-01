import { IoCContainer } from "../ioc/IoCContainer.js";
import express from "express";
import { getApplicationMeta } from "../parser/getApplicationMeta.js";
import { importClasses } from "./importClasses.js";
import { registerControllers } from "./controllers/registerControllers.js";
import type { ApplicationMeta } from "../parser/ApplicationMeta.js";

export class Squiggle {
  private _container: IoCContainer | null = null;
  private _server: express.Express | null = null;

  get container(): IoCContainer {
    if (!this._container) {
      throw new Error(
        "Component container is null. Have you initialized the application?"
      );
    }

    return this._container;
  }

  get server(): express.Express {
    if (!this._server) {
      throw new Error("Server is null. Have you initialized the application?");
    }

    return this._server;
  }

  async init() {
    const applicationMeta = getApplicationMeta();
    this._container = await this.createContainer(applicationMeta);
    this._server = express();
    this._server.use(express.json());

    registerControllers(
      this.server,
      this.container,
      applicationMeta.controllers
    );
  }

  private async createContainer(
    applicationMeta: ApplicationMeta
  ): Promise<IoCContainer> {
    const controllers = await importClasses(applicationMeta.controllers);
    const components = await importClasses(applicationMeta.components);
    return new IoCContainer(controllers.concat(components));
  }

  listen(port: number, callback?: (error?: Error) => void) {
    this.server.listen(port, (e) => {
      console.log(`Squiggle listening on http://localhost:${port}`);
      callback?.(e);
    });
  }
}
