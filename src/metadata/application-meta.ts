import type { ClassMeta } from './class-meta'
import type { ControllerMeta } from './controller/controller-meta'

export type ApplicationMeta = {
	controllers: ControllerMeta[]
	components: ClassMeta[]
}
