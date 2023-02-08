import Vibrant from "node-vibrant";
import camelCase from "lodash.camelcase";
import invoke from "lodash.invoke";

export async function getPalette(src) {
  const palette = await Vibrant.from(src).getPalette();
  const setPaletteColor = (acc, paletteName) => ({
    ...acc,
    [camelCase(paletteName)]: invoke(palette, [paletteName, "getHex"]),
  });

  return Object.keys(palette).reduce(setPaletteColor, {});
}
