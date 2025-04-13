import type { ClassConstructor } from '@swish/ioc'

export const Controller = (baseRoute = '') => {
	return <T extends ClassConstructor>(ctor: T) => {}
}
