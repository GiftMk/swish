import type { IoCContainer } from '../ioc'
import type { ControllerMeta } from '../metadata'
import { toRouteBinding } from './to-route-binding'
import type { ControllerBindings } from './controller-bindings'

export const getControllerBindings = async (
	container: IoCContainer,
	controllerMeta: ControllerMeta,
): Promise<ControllerBindings> => {
	const instance = container.resolve(controllerMeta.className)

	return {
		getRequests: controllerMeta.getMappings.map(mapping =>
			toRouteBinding(instance, controllerMeta.route, mapping),
		),
		postRequests: controllerMeta.postMappings.map(mapping =>
			toRouteBinding(instance, controllerMeta.route, mapping),
		),
		putRequests: controllerMeta.putMappings.map(mapping =>
			toRouteBinding(instance, controllerMeta.route, mapping),
		),
		patchRequests: controllerMeta.patchMappings.map(mapping =>
			toRouteBinding(instance, controllerMeta.route, mapping),
		),
		deleteRequests: controllerMeta.deleteMappings.map(mapping =>
			toRouteBinding(instance, controllerMeta.route, mapping),
		),
	}
}
