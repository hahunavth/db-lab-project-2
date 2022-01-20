import React, { ReactElement } from "react";
import styles from "../../styles/Home.module.css";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer className={styles.footer}>
      Powered by <span className="font-bold text-lg pl-2"> Group 11</span>
      <span className={styles.logo}></span>
    </footer>
  );
}
