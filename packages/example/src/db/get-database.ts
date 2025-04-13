import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'

export const getDatabase = (): NodePgDatabase => {
	const dbUrl = process.env.DATABASE_URL

	if (!dbUrl) {
		throw new Error('DATABASE_URL not defined')
	}

	return drizzle(dbUrl)
}
