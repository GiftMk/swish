import { Controller, Component } from '@swish/decorators'
import type { ClassDeclaration } from 'ts-morph'
import type { ClassType } from '../types'

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
