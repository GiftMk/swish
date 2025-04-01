import type { DatabaseEntity } from './DatabaseEntity.js'

export type Actor = DatabaseEntity & {
	firstName: string
	lastName: string
}
