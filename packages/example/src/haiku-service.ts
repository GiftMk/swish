import { Component } from '@swish/decorators'
import type { HaikuRepository } from './haiku-repository'
import type { Haiku, NewHaiku } from './haiku'
import { MAX_LINE_LENGTH } from './db/schema'

@Component()
export class HaikuService {
	private readonly repository: HaikuRepository

	constructor(repository: HaikuRepository) {
		this.repository = repository
	}

	async addHaiku(newHaiku: NewHaiku): Promise<Haiku> {
		const { lineOne, lineTwo, lineThree } = newHaiku
		if (lineOne.length > MAX_LINE_LENGTH) {
			throw new Error(
				`Line one is too long, max length is ${MAX_LINE_LENGTH}, got ${lineOne.length}`,
			)
		}

		if (lineTwo.length > MAX_LINE_LENGTH) {
			throw new Error(
				`Line two is too long, max length is ${MAX_LINE_LENGTH}, got ${lineTwo.length}`,
			)
		}

		if (lineThree.length > MAX_LINE_LENGTH) {
			throw new Error(
				`Line three is too long, max length is ${MAX_LINE_LENGTH}, got ${lineThree.length}`,
			)
		}

		return await this.repository.add(newHaiku)
	}

	async getAll(filter?: string): Promise<Haiku[]> {
		const haikus = await this.repository.selectAll()

		const loweredFilter = filter?.toLowerCase()
		return haikus.filter(haiku => {
			if (!loweredFilter) return true

			return (
				haiku.lineOne.toLowerCase().includes(loweredFilter) ||
				haiku.lineTwo.toLowerCase().includes(loweredFilter) ||
				haiku.lineThree.toLowerCase().includes(loweredFilter)
			)
		})
	}

	async getById(id: number): Promise<Haiku | undefined> {
		return await this.repository.selectById(id)
	}

	async delete(id: number): Promise<Haiku> {
		return await this.repository.delete(id)
	}
}
