import type { ClassMeta } from '../ClassMeta.js'

export type ComponentMeta = Omit<ClassMeta, 'declaration'>
