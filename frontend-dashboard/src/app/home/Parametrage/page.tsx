import React from "react";
import styles from "../home.module.css";
import Link from "next/link";
export default function page() {
  return (
    <div className={styles.home_section}>
       <ul className={styles.breadcrumb}>
        <li>
          <Link href="/home">ETK SETTINGS</Link>
        </li>
        <li>
          <Link href="#">PARAMÈTRAGE BOUTIQUE</Link>
        </li>
      </ul>
      <div className={styles.data_info}>
      <Link href="/home/horaire">
        <div className={styles.box}>
          <div className={styles.back}>
            <i className='bx bx-time'></i>
          </div>
          <div className={styles.data}>
            <p>
              Horaire
              <br />
              Boutique
            </p>
            <span>Description</span>
          </div>
        </div>
        </Link>
        <div className={styles.box_invisible}>
        </div>
        <div className={styles.box_invisible}>
        </div>
        <div className={styles.box_invisible}>
        </div>
        <div className={styles.box_invisible}>
        </div>
        <div className={styles.box_invisible}>
        </div>
      </div>
    </div>
  );
}
