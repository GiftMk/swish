import { Project } from 'ts-morph'
import type { ApplicationMeta } from './ApplicationMeta.js'
import { resolveControllers } from './controllers/resolveControllers.js'
import { ClassLookup } from './ClassLookup.js'
import { resolveComponents } from './components/resolveComponents.js'

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
