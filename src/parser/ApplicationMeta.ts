import type { ComponentMeta } from './components/ComponentMeta.js'
import type { ControllerMeta } from './controllers/ControllerMeta.js'

export type ApplicationMeta = {
	controllers: ControllerMeta[]
	components: ComponentMeta[]
}
