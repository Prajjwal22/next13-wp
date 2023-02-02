import React from "react";
import Card from "../../cards/Card";
import styles from "./ThreeColGrid.module.scss";

export default function ThreeColGrid() {
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridWrapper}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> 
        <Card />
        <Card />
      </div>
    </div>
  );
}
