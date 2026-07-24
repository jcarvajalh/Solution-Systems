import type { InteractiveAppState } from "../types";

export function createInitialState(): InteractiveAppState {
  return { isReady: false };
}
