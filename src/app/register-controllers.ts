import type { IoCContainer } from '../ioc'
import type { ControllerMeta } from '../metadata'
import { getControllerBindings } from './get-controller-bindings'
import { registerRequests } from './register-requests'
import type { Express } from 'express'

export const registerControllers = async (
	server: Express,
	container: IoCContainer,
	controllers: ControllerMeta[],
) => {
	for (const controller of controllers) {
		const {
			getRequests,
			postRequests,
			putRequests,
			patchRequests,
			deleteRequests,
		} = await getControllerBindings(container, controller)

		registerRequests(server, 'get', getRequests)
		registerRequests(server, 'post', postRequests)
		registerRequests(server, 'put', putRequests)
		registerRequests(server, 'patch', patchRequests)
		registerRequests(server, 'delete', deleteRequests)
	}
}
