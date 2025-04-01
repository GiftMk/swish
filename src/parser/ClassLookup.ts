import type { ClassDeclaration, Project, SourceFile } from "ts-morph";
import { getImportPathOrThrow } from "./getImportPathOrThrow.js";
import type { ClassMeta } from "./ClassMeta.js";
import { getClassType } from "./getClassType.js";
import { getClassDependencies } from "./getClassDependencies.js";

export class ClassLookup {
  private readonly controllerMap: Map<string, ClassMeta> = new Map();
  private readonly componentMap: Map<string, ClassMeta> = new Map();

  constructor(project: Project) {
    this.load(project);
  }

  private load(project: Project) {
    for (const sourceFile of project.getSourceFiles()) {
      for (const clazz of sourceFile.getClasses()) {
        this.registerClass(project, sourceFile, clazz);
      }
    }
  }

  private registerClass(
    project: Project,
    sourceFile: SourceFile,
    clazz: ClassDeclaration
  ) {
    const type = getClassType(clazz);

    if (!type) {
      return;
    }

    const className = clazz.getName();
    const importPath = getImportPathOrThrow(project, sourceFile);
    const isExported = clazz.isExported();
    const isDefaultExport = clazz.isDefaultExport();
    const dependencies = getClassDependencies(clazz);

    if (!className) {
      throw new Error(`Injectable class found at ${importPath} without a name`);
    }

    if (!isExported) {
      throw new Error(`Injectable class ${className} is not exported`);
    }

    const meta: ClassMeta = {
      className,
      declaration: clazz,
      importPath,
      type,
      isDefaultExport,
      dependencies,
    };

    if (type === "controller") {
      this.controllerMap.set(className, meta);
    } else {
      this.componentMap.set(className, meta);
    }
  }

  get controllers(): ClassMeta[] {
    return [...this.controllerMap.values()];
  }

  get components(): ClassMeta[] {
    return [...this.componentMap.values()];
  }

  getController(name: string): ClassMeta | undefined {
    return this.controllerMap.get(name);
  }

  getComponent(name: string): ClassMeta | undefined {
    return this.componentMap.get(name);
  }

  getComponentOrThrow(name: string): ClassMeta {
    const component = this.getComponent(name);

    if (!component) {
      throw new Error(`Component ${name} not found`);
    }

    return component;
  }

  hasController(name: string): boolean {
    return this.controllerMap.has(name);
  }

  hasComponent(name: string): boolean {
    return this.componentMap.has(name);
  }
}
