import { useInteractiveApp } from "../hooks/useInteractiveApp";

export interface InteractiveAppProps {
  title?: string;
}

export default function InteractiveApp({ title }: InteractiveAppProps) {
  const { state } = useInteractiveApp();

  return (
    <div>
      {title && <h2>{title}</h2>}
      <p>{state.isReady ? "Ready" : "Not ready"}</p>
    </div>
  );
}
