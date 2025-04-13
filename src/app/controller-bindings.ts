import type { RouteBinding } from './route-binding'

export type ControllerBindings = {
	getRequests: RouteBinding[]
	postRequests: RouteBinding[]
	putRequests: RouteBinding[]
	patchRequests: RouteBinding[]
	deleteRequests: RouteBinding[]
}
