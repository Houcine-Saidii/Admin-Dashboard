"use client";
import React, { useState } from 'react'
import styles from "../home.module.css";
import Link from "next/link";
import Modal from "../../modal/article/article";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.home_section}>
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="/home">ETK SETTINGS</Link>
        </li>
        <li>
          <Link href="#">CATALOGUE</Link>
        </li>
      </ul>
      <div className={styles.data_info}>
        <Link href="" onClick={() => setIsOpen(true)}>
        <div className={styles.box}>
          <div className={styles.back}>
          <i className='bx bx-bookmarks'></i>
          </div>
          <div className={styles.data}>
            <p>Article</p>
            <span>Description</span>
          </div>
        </div>
        </Link>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
        <div className={styles.box_invisible}></div>
        <div className={styles.box_invisible}></div>
        <div className={styles.box_invisible}></div>
      </div>
    </div>
  );
}
