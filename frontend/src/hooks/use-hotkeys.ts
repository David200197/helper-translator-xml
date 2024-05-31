import hotkeys from "hotkeys-js";
import { useCallback } from "react";

type Action = () => void | Promise<void>;

export const useHotkeys = (key: string, action: Action) => {
  useCallback(() => {
    hotkeys(key, (e) => {
      e.preventDefault();
      action();
    });
  }, [key, action]);
};
