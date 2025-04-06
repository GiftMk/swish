import { Project } from "ts-morph";
import type { ApplicationMeta } from "../types";
import { ClassLookup } from "./class-lookup";
import { resolveComponents } from "./components/resolve-components";
import { resolveControllers } from "./controllers/resolve-controller";

const DEFAULT_TS_CONFIG_PATH = "tsconfig.json";

export const getApplicationMeta = ({
  tsConfigFilePath = DEFAULT_TS_CONFIG_PATH,
}: {
  tsConfigFilePath?: string;
} = {}): ApplicationMeta => {
  const project = new Project({
    tsConfigFilePath,
  });
  const lookup = new ClassLookup(project);

  return {
    controllers: resolveControllers(lookup),
    components: resolveComponents(lookup),
  };
};
