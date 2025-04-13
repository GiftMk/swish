import type { RouteBinding } from '../types/route-binding'
import type { Express } from 'express'
import { runAction } from './run-action'

type HttpMethod = 'get' | 'put' | 'post' | 'patch' | 'delete'

export const registerRequests = (
	server: Express,
	method: HttpMethod,
	requests: RouteBinding[],
) => {
	for (const { route, action, parameters } of requests) {
		server[method](route, async (req, res) => {
			const resolvedParameters = parameters.map(parameter => {
				switch (parameter.type) {
					case 'query':
						return req.query[parameter.key ?? parameter.name]
					case 'body':
						return req.body
					case 'path':
						return req.params[parameter.name]
					case 'request':
						return req
					case 'response': {
						return res
					}
				}
			})

			const data = runAction(res, () => action(...resolvedParameters))

			if (data instanceof Promise) {
				res.send(await data)
			} else {
				res.send(data)
			}
		})
	}
}
