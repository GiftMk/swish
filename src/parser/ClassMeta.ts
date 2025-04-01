import type { ClassDeclaration } from 'ts-morph'

export type ClassType = 'controller' | 'component'

export type ClassMeta = {
	className: string
	declaration: ClassDeclaration
	importPath: string
	isDefaultExport: boolean
	type: ClassType
	dependencies: string[]
}
