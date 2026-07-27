import { atom } from "nanostores";

import { defaultModuleId } from "../lib";
import type { ModuleId } from "../types";

/**
 * Módulo visible en la maqueta. Vive en un store y no en `useState` para que
 * cualquier otra isla (por ejemplo un enlace desde otra sección) pueda cambiarlo
 * sin recargar ni navegar.
 */
export const activeModuleId = atom<ModuleId>(defaultModuleId);
