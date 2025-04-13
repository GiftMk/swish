import type { ClassConstructor } from '@swish/ioc'

export const Component = () => {
	return <T extends ClassConstructor>(ctor: T) => {}
}
