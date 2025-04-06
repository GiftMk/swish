import { IoCContainer } from "@swish/ioc";
import { getApplicationMeta, type ApplicationMeta } from "@swish/metadata";
import { registerControllers } from "./register-controllers";
import { importClasses } from "./import-classes";
import { SwishServer } from "@swish/server";

export class Swish {
  private _container: IoCContainer | null = null;
  private _server: SwishServer | null = null;

  get container(): IoCContainer {
    if (!this._container) {
      throw new Error(
        "Component container is null. Have you initialized the application?"
      );
    }

    return this._container;
  }

  get server(): SwishServer {
    if (!this._server) {
      throw new Error("Server is null. Have you initialized the application?");
    }

    return this._server;
  }

  async init() {
    const applicationMeta = getApplicationMeta();
    this._container = await this.createContainer(applicationMeta);
    this._server = new SwishServer();

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
    this.server.start(port, (e) => {
      console.log(`Swish listening on http://localhost:${port}`);
      callback?.(e);
    });
  }
}
