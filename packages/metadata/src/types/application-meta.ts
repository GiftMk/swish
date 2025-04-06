import type { ComponentMeta } from "./component-meta";
import type { ControllerMeta } from "./controller-meta";

export type ApplicationMeta = {
  controllers: ControllerMeta[];
  components: ComponentMeta[];
};
