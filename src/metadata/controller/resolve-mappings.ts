import type { ClassDeclaration } from 'ts-morph'
import { resolveRequestMappings } from './resolve-request-mappings'
import { Get, Post, Put, Patch, Delete } from '../../decorators'

export const resolveMappings = (clazz: ClassDeclaration) => {
	const methods = clazz.getMethods()

	return {
		getMappings: resolveRequestMappings(Get.name, methods),
		postMappings: resolveRequestMappings(Post.name, methods),
		putMappings: resolveRequestMappings(Put.name, methods),
		patchMappings: resolveRequestMappings(Patch.name, methods),
		deleteMappings: resolveRequestMappings(Delete.name, methods),
	}
}
