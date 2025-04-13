import type { ClassLookup } from './class-lookup'
import type { ClassMeta } from './class-meta'

export const resolveComponents = (lookup: ClassLookup): ClassMeta[] => {
	return lookup.components.map(({ declaration, ...props }) => props)
}
