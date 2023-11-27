"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Popup from "../Popup/Popup";
import Auth from "../Auth/Auth";

export default function Header() {
  const [active, setActive] = useState(false);
  return (
    <>
      <header className={styles.header_container}>
        <div className={styles.logo}></div>
        <div className={styles.btns_container}>
          <button className={styles.menu}></button>
          <button
            className={styles.auth}
            onClick={() => setActive(true)}
          ></button>
        </div>
      </header>
      <Popup active={active} setActive={setActive}>
        <Auth />
      </Popup>
    </>
  );
}
