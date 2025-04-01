import type { ClassDeclaration } from 'ts-morph'

export const getClassDependencies = (clazz: ClassDeclaration) => {
	const classname = clazz.getName()
	const constructors = clazz.getConstructors()

	if (constructors.length > 1) {
		throw new Error(
			`Components must only have one constructor, found ${constructors.length} in ${classname}`,
		)
	}

	const ctor = constructors[0]
	const parameters = ctor?.getParameters() ?? []
	const dependencies: string[] = []

	for (const parameter of parameters) {
		const parameterTypeName = parameter.getType().getSymbol()?.getEscapedName()
		if (!parameterTypeName) {
			throw new Error(
				`Constructor parameter ${parameter.getName()} for class ${classname} does not have a type name.`,
			)
		}

		dependencies.push(parameterTypeName)
	}

	return dependencies
}
