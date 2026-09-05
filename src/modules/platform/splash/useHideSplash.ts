import { useEffect } from "react";

import { hideSplash } from "./hideSplash";

export function useHideSplash(ready: boolean): void {
  useEffect(() => {
    if (!ready) {
      return;
    }

    void hideSplash();
  }, [ready]);
}
