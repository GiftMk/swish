import type { DatabaseEntity } from './DatabaseEntity.js'

export type Movie = DatabaseEntity & {
	title: string
	description: string
	directorId: string
	actorIds: string[]
}
