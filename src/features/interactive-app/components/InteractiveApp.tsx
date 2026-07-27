import { useInteractiveApp } from "../hooks/useInteractiveApp";
import AppWindow from "./AppWindow";
import ModulePills from "./ModulePills";

export interface InteractiveAppProps {
  /** URL ya optimizada del fondo; la resuelve el envoltorio de Astro. */
  backdropSrc: string;
}

export default function InteractiveApp({ backdropSrc }: InteractiveAppProps) {
  const { modules, activeId, activeModule, selectModule } = useInteractiveApp();

  return (
    <>
      <div className="max-w-site mx-auto w-full px-6">
        <ModulePills
          modules={modules}
          activeId={activeId}
          onSelect={selectModule}
        />
      </div>

      {/*
        Las divisorias van a todo lo ancho, como en el diseño. La inferior cierra
        el bloque a ras de la ventana, igual que la superior lo abre.
      */}
      <div className="mt-6 border-y border-black/10">
        <div className="max-w-site mx-auto w-full px-6">
          <div className="border-x border-black/10 bg-white p-1">
            <AppWindow
              modules={modules}
              activeModule={activeModule}
              onSelect={selectModule}
              backdropSrc={backdropSrc}
            />
          </div>
        </div>
      </div>
    </>
  );
}
