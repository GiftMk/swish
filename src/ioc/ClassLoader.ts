import type { ClassContext } from './ClassContext.js'
import type { ClassInstance } from './ClassInstance.js'

export class ComponentLoader {
	private readonly componentContext: ClassContext
	private readonly componentLoaderMap: Map<string, ComponentLoader>

	constructor(
		componentContext: ClassContext,
		componentLoaderMap: Map<string, ComponentLoader>,
	) {
		this.componentContext = componentContext
		this.componentLoaderMap = componentLoaderMap
	}

	load(): ClassInstance {
		if (this.componentContext.dependencies.length === 0) {
			return new this.componentContext.target()
		}

		const resolvedDependencies = this.componentContext.dependencies.map(
			dependency => {
				const dependencyLoader = this.componentLoaderMap.get(dependency)

				if (!dependencyLoader) {
					throw new Error(`Failed to resolve dependency ${dependency}`)
				}

				return dependencyLoader.load()
			},
		)

		return new this.componentContext.target(...resolvedDependencies)
	}
}
