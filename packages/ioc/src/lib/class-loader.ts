import type { ClassContext } from "../types/class-context";
import type { ClassInstance } from "../types/class-instance";

export class ComponentLoader {
  private readonly componentContext: ClassContext;
  private readonly componentLoaderMap: Map<string, ComponentLoader>;

  constructor(
    componentContext: ClassContext,
    componentLoaderMap: Map<string, ComponentLoader>
  ) {
    this.componentContext = componentContext;
    this.componentLoaderMap = componentLoaderMap;
  }

  load(): ClassInstance {
    if (this.componentContext.dependencies.length === 0) {
      return new this.componentContext.target();
    }

    const resolvedDependencies = this.componentContext.dependencies.map(
      (dependency) => {
        const dependencyLoader = this.componentLoaderMap.get(dependency);

        if (!dependencyLoader) {
          throw new Error(`Failed to resolve dependency ${dependency}`);
        }

        return dependencyLoader.load();
      }
    );

    return new this.componentContext.target(...resolvedDependencies);
  }
}
