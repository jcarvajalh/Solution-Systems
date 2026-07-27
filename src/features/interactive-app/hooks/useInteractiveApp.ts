import { useStore } from "@nanostores/react";
import { useCallback } from "react";

import { appModules } from "../lib";
import { activeModuleId } from "../stores";
import type { AppModule, ModuleId } from "../types";

export interface UseInteractiveApp {
  modules: AppModule[];
  activeId: ModuleId;
  activeModule: AppModule;
  selectModule: (id: ModuleId) => void;
}

export function useInteractiveApp(): UseInteractiveApp {
  const activeId = useStore(activeModuleId);

  const selectModule = useCallback((id: ModuleId) => {
    activeModuleId.set(id);
  }, []);

  // El store solo admite ids del catálogo, así que siempre hay coincidencia.
  const activeModule =
    appModules.find((module) => module.id === activeId) ?? appModules[0]!;

  return { modules: appModules, activeId, activeModule, selectModule };
}
