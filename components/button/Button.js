import React from "react";

export default function Button({label, type, center, icon}) {

   center = "center"

  return (
    <div>
      <button className={`${type} ctaBtn ${center}`}>{icon} {label}</button>
    </div>
  );
}
