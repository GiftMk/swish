import { ApiError } from './errors'
import type { HttpResponse } from './http-response'

export const runAction = async (
	res: HttpResponse,
	action: () => Promise<unknown> | unknown,
) => {
	try {
		const data = action()
		if (data instanceof Promise) {
			return await data
		}
		return data
	} catch (e) {
		if (e instanceof ApiError) {
			res.status(e.status)
			return { message: e.message }
		}
		res.status(500)
		return { message: 'Internal server error' }
	}
}
