import type { DatabaseEntity } from './DatabaseEntity.js'

export type Director = DatabaseEntity & {
	firstName: string
	lastName: string
}
