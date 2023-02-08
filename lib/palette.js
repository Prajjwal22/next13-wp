import React from "react";
import { usePalette } from "./usePalette";

export const Palette = ({ src, children }) => {
  const palette = usePalette(src);

  return <>{children(palette)}</>;
};
