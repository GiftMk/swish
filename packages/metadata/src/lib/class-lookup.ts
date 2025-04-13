import type { Project, SourceFile, ClassDeclaration } from 'ts-morph'
import type { ClassMeta } from '../types'
import { getClassDependencies } from './get-class-dependencies'
import { getClassType } from './get-class-type'
import type { ClassDeclarationMeta } from '../types/class-declaration-meta'

export class ClassLookup {
	private readonly controllerMap: Map<string, ClassDeclarationMeta> = new Map()
	private readonly componentMap: Map<string, ClassDeclarationMeta> = new Map()

	constructor(project: Project) {
		this.load(project)
	}

	private load(project: Project) {
		for (const sourceFile of project.getSourceFiles()) {
			for (const clazz of sourceFile.getClasses()) {
				this.registerClass(sourceFile, clazz)
			}
		}
	}

	private registerClass(sourceFile: SourceFile, clazz: ClassDeclaration) {
		const type = getClassType(clazz)

		if (!type) {
			return
		}

		const className = clazz.getName()
		const importPath = sourceFile.getFilePath()
		const isExported = clazz.isExported()
		const isDefaultExport = clazz.isDefaultExport()
		const dependencies = getClassDependencies(clazz)

		if (!className) {
			throw new Error(`Injectable class found at ${importPath} without a name`)
		}

		if (!isExported) {
			throw new Error(`Injectable class ${className} is not exported`)
		}

		const meta: ClassDeclarationMeta = {
			className,
			declaration: clazz,
			importPath,
			type,
			isDefaultExport,
			dependencies,
		}

		if (type === 'controller') {
			this.controllerMap.set(className, meta)
		} else {
			this.componentMap.set(className, meta)
		}
	}

	get controllers(): ClassDeclarationMeta[] {
		return [...this.controllerMap.values()]
	}

	get components(): ClassDeclarationMeta[] {
		return [...this.componentMap.values()]
	}

	getController(name: string): ClassMeta | undefined {
		return this.controllerMap.get(name)
	}

	getComponent(name: string): ClassMeta | undefined {
		return this.componentMap.get(name)
	}

	getComponentOrThrow(name: string): ClassMeta {
		const component = this.getComponent(name)

		if (!component) {
			throw new Error(`Component ${name} not found`)
		}

		return component
	}

	hasController(name: string): boolean {
		return this.controllerMap.has(name)
	}

	hasComponent(name: string): boolean {
		return this.componentMap.has(name)
	}
}
