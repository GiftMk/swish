import { Body, Controller, Delete, Get, Post, Query } from '@swish/decorators'
import type { Haiku } from './haiku'
import type { HaikuService } from './haiku-service'
import { NotFoundError } from '@swish/errors'

@Controller()
export class HaikuController {
	private readonly haikuService: HaikuService

	constructor(haikuService: HaikuService) {
		this.haikuService = haikuService
	}

	@Get()
	async getHaikus(@Query() filter: string): Promise<Haiku[]> {
		return await this.haikuService.getAll(filter)
	}

	@Get(':id')
	async getHaiku(id: number) {
		const haiku = await this.haikuService.getById(id)

		if (!haiku) {
			throw new NotFoundError(`Haiku not found with id ${id}`)
		}

		return haiku
	}

	@Post()
	async addHaiku(@Body() haiku: Haiku) {
		return await this.haikuService.addHaiku(haiku)
	}

	@Delete(':id')
	async deleteHaiku(id: number) {
		return await this.haikuService.delete(id)
	}
}
