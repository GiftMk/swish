import type { ClassConstructor } from '../ioc'

export const Controller = (baseRoute = '') => {
	return <T extends ClassConstructor>(ctor: T) => {}
}
