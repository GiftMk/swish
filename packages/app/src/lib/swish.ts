import { IoCContainer } from "@swish/ioc";
import {
  getApplicationMeta,
  type ApplicationMeta,
  type ClassMeta,
} from "@swish/metadata";
import { registerControllers } from "./register-controllers";
import { importClasses } from "./import-classes";
import express from "express";

export class Swish {
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
    const classes: Omit<ClassMeta, "declaration">[] = [
      ...applicationMeta.controllers,
      ...applicationMeta.components,
    ];
    return new IoCContainer(await importClasses(classes));
  }

  listen(port: number, callback?: (error?: Error) => void) {
    this.server.listen(port, (e) => {
      console.log(`Swish listening on http://localhost:${port}`);
      callback?.(e);
    });
  }
}
