import { Project } from 'ts-morph'
import { ClassLookup } from './class-lookup'
import { resolveComponents } from './resolve-components'
import { resolveControllers } from './controller/resolve-controllers'
import type { ApplicationMeta } from './application-meta'

const DEFAULT_TS_CONFIG_PATH = 'tsconfig.json'

export const getApplicationMeta = ({
	tsConfigFilePath = DEFAULT_TS_CONFIG_PATH,
}: {
	tsConfigFilePath?: string
} = {}): ApplicationMeta => {
	const project = new Project({
		tsConfigFilePath,
	})
	const lookup = new ClassLookup(project)

	return {
		controllers: resolveControllers(lookup),
		components: resolveComponents(lookup),
	}
}
