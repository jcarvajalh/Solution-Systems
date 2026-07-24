import { atom } from "nanostores";
import type { InteractiveAppState } from "../types";

export const interactiveAppState = atom<InteractiveAppState>({
  isReady: false,
});
