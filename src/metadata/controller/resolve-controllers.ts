import { Controller } from '../../decorators'
import type { ClassLookup } from '../class-lookup'
import { getDecoratorText } from '../get-decorator-text'
import type { ControllerMeta } from './controller-meta'
import { resolveMappings } from './resolve-mappings'

export const resolveControllers = (lookup: ClassLookup): ControllerMeta[] => {
	return lookup.controllers.map(meta => {
		const { declaration, ...props } = meta
		const decorator = declaration.getDecorator(Controller.name)

		if (!decorator) {
			throw new Error(
				`Class ${declaration.getName()} is not a controller. Missing controller decorator`,
			)
		}

		const route = getDecoratorText(decorator)

		return {
			...props,
			route,
			...resolveMappings(meta.declaration),
		}
	})
}
