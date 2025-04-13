import type { ClassDeclaration } from 'ts-morph'
import type { ClassMeta } from './class-meta'

export type ClassDeclarationMeta = {
	declaration: ClassDeclaration
} & ClassMeta
