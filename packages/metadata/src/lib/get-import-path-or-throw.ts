import type { Project, SourceFile } from 'ts-morph'

export const getImportPathOrThrow = (
	project: Project,
	sourceFile: SourceFile,
) => {
	const path = project
		.emitToMemory({ targetSourceFile: sourceFile })
		.getFiles()[0]?.filePath

	if (!path) {
		throw new Error(
			`Failed to resolve import path for source file ${sourceFile.getBaseName()}`,
		)
	}

	return path
}
