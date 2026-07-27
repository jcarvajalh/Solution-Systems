import { useRef, type KeyboardEvent } from "react";

import type { AppModule, ModuleId } from "../types";
import AppIcon from "./AppIcon";

export const panelId = "ss-app-panel";
export const tabId = (id: ModuleId) => `ss-app-tab-${id}`;

export interface ModulePillsProps {
  modules: AppModule[];
  activeId: ModuleId;
  onSelect: (id: ModuleId) => void;
}

/**
 * Control principal de la maqueta. Implementa el patrón de pestañas completo
 * —`tabindex` móvil y flechas— para que se pueda recorrer con teclado igual que
 * una aplicación real (§9).
 */
export default function ModulePills({
  modules,
  activeId,
  onSelect,
}: ModulePillsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const target = modules[(index + modules.length) % modules.length];
    if (!target) return;

    onSelect(target.id);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#${tabId(target.id)}`)
      ?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = modules.findIndex((module) => module.id === activeId);

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(current + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(modules.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Módulos de la aplicación"
      onKeyDown={handleKeyDown}
      className="flex flex-wrap items-center justify-center gap-x-[30px] gap-y-3"
    >
      {modules.map((module) => {
        const isActive = module.id === activeId;

        return (
          <button
            key={module.id}
            id={tabId(module.id)}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(module.id)}
            className={`ss-tap-target focus-visible:outline-brand inline-flex h-[27px] items-center gap-1 rounded-full border px-[15px] text-[12px] font-semibold tracking-[-0.02em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isActive
                ? "border-brand bg-brand text-white"
                : "text-ink hover:border-brand hover:text-brand border-black/20 bg-white"
            }`}
          >
            <AppIcon name={module.icon} className="size-[11px] shrink-0" />
            {module.label}
          </button>
        );
      })}
    </div>
  );
}
