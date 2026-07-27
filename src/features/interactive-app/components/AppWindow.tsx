import type { AppModule, ModuleId } from "../types";
import AppSidebar from "./AppSidebar";
import Dashboard from "./Dashboard";
import { panelId, tabId } from "./ModulePills";

const TRAFFIC_LIGHTS = [
  { color: "#ff5f57", label: "Cerrar" },
  { color: "#febc2e", label: "Minimizar" },
  { color: "#28c840", label: "Ampliar" },
];

export interface AppWindowProps {
  modules: AppModule[];
  activeModule: AppModule;
  onSelect: (id: ModuleId) => void;
  backdropSrc: string;
}

export default function AppWindow({
  modules,
  activeModule,
  onSelect,
  backdropSrc,
}: AppWindowProps) {
  return (
    <div className="relative overflow-hidden rounded-[3px]">
      <img
        src={backdropSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Márgenes de la foto alrededor de la ventana, según Figma. */}
      <div className="relative px-3 pt-3 sm:px-[22px] sm:pt-[21px]">
        <div className="overflow-hidden rounded-t-[10px] border border-b-0 border-black/20 bg-white">
          <div className="bg-surface-chrome flex h-[30px] items-center gap-[6px] border-b border-black/20 px-[18px]">
            {TRAFFIC_LIGHTS.map((light) => (
              <span
                key={light.label}
                title={light.label}
                className="size-[11px] rounded-full"
                style={{ backgroundColor: light.color }}
              />
            ))}
            <p className="text-ink-secondary flex-1 truncate text-center text-[10px]">
              {activeModule.windowTitle}
            </p>
            {/* Contrapeso de los semáforos para que el título quede centrado. */}
            <span aria-hidden="true" className="w-[45px] shrink-0" />
          </div>

          <div className="flex h-[420px] sm:h-[425px]">
            <div className="hidden overflow-y-auto md:block">
              <AppSidebar
                modules={modules}
                activeId={activeModule.id}
                onSelect={onSelect}
              />
            </div>

            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId(activeModule.id)}
              tabIndex={0}
              className="bg-surface-muted focus-visible:outline-brand min-w-0 flex-1 overflow-y-auto focus-visible:outline-2 focus-visible:-outline-offset-2"
            >
              <Dashboard dashboard={activeModule.dashboard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
