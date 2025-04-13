export type ClassType = 'controller' | 'component'

export type ClassMeta = {
	className: string
	importPath: string
	isDefaultExport: boolean
	type: ClassType
	dependencies: string[]
}
