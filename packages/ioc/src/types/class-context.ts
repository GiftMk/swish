import type { ClassConstructor } from './class-constructor'

export type ClassContext = {
	target: ClassConstructor
	dependencies: string[]
}
