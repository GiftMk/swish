import type { ClassConstructor } from '../ioc'

export const Component = () => {
	return <T extends ClassConstructor>(ctor: T) => {}
}
