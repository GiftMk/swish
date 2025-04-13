import type { ClassContext } from '@swish/ioc'
import type { ClassMeta } from '@swish/metadata'

const importClass = async (clazz: ClassMeta): Promise<ClassContext> => {
	const module = await import(clazz.importPath)
	const target = clazz.isDefaultExport ? module : module[clazz.className]

	return {
		target,
		dependencies: clazz.dependencies,
	}
}

export const importClasses = async (
	classes: ClassMeta[],
): Promise<ClassContext[]> => {
	try {
		return await Promise.all(classes.map(importClass))
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(
				`The following error occurred when importing classes: ${e.message}`,
			)
		}
		throw new Error('An unknown error occurred when importing classes')
	}
}
