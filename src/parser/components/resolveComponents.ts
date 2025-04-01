import type { ComponentMeta } from './ComponentMeta.js'
import type { ClassLookup } from '../ClassLookup.js'

export const resolveComponents = (lookup: ClassLookup): ComponentMeta[] => {
	return lookup.components.map(({ declaration, ...props }) => props)
}
