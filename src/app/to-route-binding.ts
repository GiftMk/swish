import { getFullRoute } from './get-full-route.js'
import type { RouteBinding } from './route-binding.js'
import type { ClassInstance } from '../ioc/index.js'
import type { RequestMappingMeta } from '../metadata/index.js'

export const toRouteBinding = (
	instance: ClassInstance,
	baseRoute: string,
	mappingMeta: RequestMappingMeta,
): RouteBinding => {
	const action = instance[mappingMeta.name]

	if (typeof action !== 'function') {
		throw new Error('')
	}

	return {
		route: getFullRoute(baseRoute, mappingMeta.route),
		parameters: mappingMeta.parameters,
		action: action.bind(instance),
	}
}
