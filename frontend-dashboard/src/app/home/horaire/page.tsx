"use client";
import React from "react";
import styles from "../home.module.css";
import Table from "./table";
import { BsExclamationCircle } from "react-icons/bs";
import Link from "next/link";

export default function horaire() {
  return (
    <div className={styles.home_section}>
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="/home">ETK SETTINGS</Link>
        </li>
        <li>
          <Link href="/home/Parametrage">PARAMÈTRAGE BOUTIQUE</Link>
        </li>
        <li>
          <Link href="#">HORAIRE BOUTIQUE</Link>
        </li>
      </ul>
      <div
        className={`${styles.zone1} alert alert-light alert-dismissible fade show`}
        role="alert"
      >
        <div className={styles.timesurf}>
          <BsExclamationCircle className={styles.time} />
        </div>
        <span>Veuillez paramètre votre horaire d'ouverture</span>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <Table />
    </div>
  );
}
