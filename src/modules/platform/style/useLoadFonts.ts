import {
  Figtree_400Regular,
  Figtree_400Regular_Italic,
  Figtree_500Medium,
  Figtree_500Medium_Italic,
  Figtree_600SemiBold,
  Figtree_600SemiBold_Italic,
} from "@expo-google-fonts/figtree";
import {
  Syne_500Medium,
  Syne_600SemiBold,
  Syne_700Bold,
  Syne_800ExtraBold,
} from "@expo-google-fonts/syne";
import { useFonts } from "expo-font";

import { FONT_FAMILY } from "./FONT_FAMILY";

export function useLoadFonts(): boolean {
  const [loaded] = useFonts({
    [FONT_FAMILY.display.medium]: Syne_500Medium,
    [FONT_FAMILY.display.semibold]: Syne_600SemiBold,
    [FONT_FAMILY.display.bold]: Syne_700Bold,
    [FONT_FAMILY.display.heavy]: Syne_800ExtraBold,
    [FONT_FAMILY.body.regular]: Figtree_400Regular,
    [FONT_FAMILY.body.regularItalic]: Figtree_400Regular_Italic,
    [FONT_FAMILY.body.medium]: Figtree_500Medium,
    [FONT_FAMILY.body.mediumItalic]: Figtree_500Medium_Italic,
    [FONT_FAMILY.body.semibold]: Figtree_600SemiBold,
    [FONT_FAMILY.body.semiboldItalic]: Figtree_600SemiBold_Italic,
  });

  return loaded;
}
