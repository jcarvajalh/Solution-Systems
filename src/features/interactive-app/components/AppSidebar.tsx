import { useId, useMemo, useState } from "react";

import type { AppModule, ModuleId } from "../types";
import AppIcon from "./AppIcon";

export interface AppSidebarProps {
  modules: AppModule[];
  activeId: ModuleId;
  onSelect: (id: ModuleId) => void;
}

/**
 * Menú lateral de la ventana. Refleja el mismo estado que las píldoras
 * superiores, así que aquí los controles son botones con `aria-pressed` y no una
 * segunda lista de pestañas.
 */
export default function AppSidebar({
  modules,
  activeId,
  onSelect,
}: AppSidebarProps) {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const visibleModules = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return modules;

    return modules.filter((module) =>
      module.label.toLowerCase().includes(term),
    );
  }, [modules, query]);

  return (
    <div className="flex w-[155px] shrink-0 flex-col border-r border-black/20 bg-[#fefefe] px-[18px] py-4">
      <label htmlFor={searchId} className="sr-only">
        Buscar módulo
      </label>
      <div className="relative">
        <AppIcon
          name="search"
          className="pointer-events-none absolute top-1/2 left-2 size-[10px] -translate-y-1/2 text-black/30"
        />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar..."
          className="text-ink focus-visible:outline-brand h-[25px] w-full rounded-[5px] border border-black/20 bg-white pr-2 pl-6 text-[10px] placeholder:text-black/30 focus-visible:outline-2 focus-visible:outline-offset-1"
        />
      </div>

      <ul className="mt-3 space-y-[2px]">
        {visibleModules.map((module) => {
          const isActive = module.id === activeId;

          return (
            <li key={module.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(module.id)}
                className={`focus-visible:outline-brand flex h-[26px] w-full items-center gap-[5px] rounded-[5px] px-[7px] text-left text-[12px] tracking-[-0.02em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 ${
                  isActive
                    ? "bg-black/10 font-medium text-black"
                    : "font-medium text-black/50 hover:bg-black/5 hover:text-black/80"
                }`}
              >
                <AppIcon name={module.icon} className="size-[12px] shrink-0" />
                <span className="truncate">{module.label}</span>
              </button>
            </li>
          );
        })}

        {visibleModules.length === 0 && (
          <li className="px-[7px] py-2 text-[10px] text-black/40">
            Sin resultados
          </li>
        )}
      </ul>
    </div>
  );
}
