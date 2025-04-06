import type { ClassInstance } from "../types/class-instance";
import type { ClassContext } from "../types/class-context";
import { ComponentLoader } from "./class-loader";

export class IoCContainer {
  private readonly lassLoaderMap = new Map<string, ComponentLoader>();

  constructor(classes: ClassContext[]) {
    for (const context of classes) {
      this.register(context);
    }
  }

  register(context: ClassContext) {
    const loader = new ComponentLoader(context, this.lassLoaderMap);

    this.lassLoaderMap.set(context.target.name, loader);
  }

  resolve(name: string): ClassInstance {
    const loader = this.lassLoaderMap.get(name);

    if (!loader) {
      throw new Error(`Class ${name} does not exist in IoC container.`);
    }

    return loader.load();
  }
}
