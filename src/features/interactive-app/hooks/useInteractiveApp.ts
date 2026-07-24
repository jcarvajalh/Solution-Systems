import { useStore } from "@nanostores/react";
import { interactiveAppState } from "../stores";

export function useInteractiveApp() {
  const state = useStore(interactiveAppState);

  return { state };
}
