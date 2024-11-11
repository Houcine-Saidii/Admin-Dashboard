// home.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";
import Link from "next/link";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [router]);

  return (
    <div className={styles.home_section}>
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="#">ETK SETTINGS</Link>
        </li>
        <li>
          <Link href="#">{userName}</Link>
        </li>
        <li>
          <Link href="#">APPLICATION</Link>
        </li>
      </ul>
      <div className={styles.data_info}>
        <Link href="/home/Parametrage">
          <div className={styles.box}>
            <div className={styles.back}>
              <i className="bx bx-cog"></i>
            </div>
            <div className={styles.data}>
              <p>
                Paramètrage
                <br />
                Boutique
              </p>
              <span>Description</span>
            </div>
          </div>
        </Link>
        <Link href="/home/Commande">
          <div className={styles.box}>
            <div className={styles.back}>
              <i className="bx bx-desktop"></i>
            </div>
            <div className={styles.data}>
              <p>Commande</p>
              <span>Description</span>
            </div>
          </div>
        </Link>
        <Link href="/home/Catalogue">
          <div className={styles.box}>
            <div className={styles.back}>
              <i className="bx bx-receipt"></i>
            </div>
            <div className={styles.data}>
              <p>Catalogue</p>
              <span>Description</span>
            </div>
          </div>
        </Link>
        <Link href="/home/Application">
          <div className={styles.box}>
            <div className={styles.back}>
              <i className="bx bxs-dashboard"></i>
            </div>
            <div className={styles.data}>
              <p>Application</p>
              <span>Description</span>
            </div>
          </div>
        </Link>
        <div className={styles.box_invisible}></div>
        <div className={styles.box_invisible}></div>
      </div>
    </div>
  );
};

export default HomePage;
