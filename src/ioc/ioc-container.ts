import type { ClassInstance } from './class-instance'
import type { ClassContext } from './class-context'
import { ComponentLoader } from './class-loader'

export class IoCContainer {
	private readonly lassLoaderMap = new Map<string, ComponentLoader>()
	private static _instance: IoCContainer | null

	constructor(classes: ClassContext[]) {
		for (const context of classes) {
			this.register(context)
		}
	}

	static get instance(): IoCContainer {
		if (!IoCContainer._instance) {
			IoCContainer._instance = new IoCContainer([])
		}
		return IoCContainer._instance
	}

	register(context: ClassContext) {
		const loader = new ComponentLoader(context, this.lassLoaderMap)

		this.lassLoaderMap.set(context.target.name, loader)
	}

	resolve(name: string): ClassInstance {
		const loader = this.lassLoaderMap.get(name)

		if (!loader) {
			throw new Error(`Class ${name} does not exist in IoC container.`)
		}

		return loader.load()
	}
}
