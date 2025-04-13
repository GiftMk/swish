import type { ClassMeta } from "./class-meta";
import type { ControllerMeta } from "./controller-meta";

export type ApplicationMeta = {
  controllers: ControllerMeta[];
  components: ClassMeta[];
};
