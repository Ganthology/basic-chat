import { createContext, useContext } from "react";

import { type IconButtonVariant } from "./IconButton";

export type IconButtonContextValue = {
  variant: IconButtonVariant;
};

export const IconButtonContext = createContext<IconButtonContextValue>({
  variant: "container",
});

export function useIconButtonContext(): IconButtonContextValue {
  return useContext(IconButtonContext);
}
