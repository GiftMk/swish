import type { ClassDeclaration } from 'ts-morph'
import { Controller, Component } from '../decorators'
import type { ClassType } from './class-meta'

export const getClassType = (
	clazz: ClassDeclaration,
): ClassType | undefined => {
	const classDecorators = clazz.getDecorators()

	if (
		classDecorators.some(decorator => decorator.getName() === Controller.name)
	) {
		return 'controller'
	}

	if (
		classDecorators.some(decorator => decorator.getName() === Component.name)
	) {
		return 'component'
	}
}
