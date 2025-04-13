import type { ParameterMeta } from './parameter-meta'

export type RequestMappingMeta = {
	name: string
	route: string
	parameters: ParameterMeta[]
}
