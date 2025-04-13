import type { ClassMeta } from '../class-meta'
import type { RequestMappingMeta } from './request-mapping-meta'

export type ControllerMeta = ClassMeta & {
	route: string
	getMappings: RequestMappingMeta[]
	postMappings: RequestMappingMeta[]
	putMappings: RequestMappingMeta[]
	patchMappings: RequestMappingMeta[]
	deleteMappings: RequestMappingMeta[]
}
