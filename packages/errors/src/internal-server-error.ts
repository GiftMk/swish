import { ApiError } from './api-error'

export class InternalServerError extends ApiError {
	constructor(message: string) {
		super(500, message)
	}
}
