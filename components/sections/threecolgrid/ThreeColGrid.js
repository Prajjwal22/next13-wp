import React from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";

export default function ThreeColGrid() {
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">What's New?</h3>
      </div>
      <div className={styles.gridWrapper}>
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard /> 
        <VerticalCard />
        <VerticalCard />
      </div>
    </div>
  );
}
