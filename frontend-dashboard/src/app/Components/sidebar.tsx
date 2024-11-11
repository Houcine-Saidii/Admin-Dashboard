import { useState } from "react";
import styles from "../home/home.module.css";
import Link from "next/link";
import Navbar from "./navbar";
import Modal from "../modal/article/article";
import Modale from "../modal/kiosk/kiosk";

interface DropdownStates {
  [key: string]: boolean;
}

interface SidebarProps {
  toggleMenu: () => void;
}

export default function sidebar({ toggleMenu }: SidebarProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    parametrage: false,
    commande: false,
    catalogue: false,
    application: false,
    peripherique: false,
  });

  const toggleDropdown = (dropdownName: string) => {
    setDropdownStates({
      ...dropdownStates,
      [dropdownName]: !dropdownStates[dropdownName],
    });
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.close}`}>
        <Link href="/home">
          <div className={styles.logo_details}>
            <i className="bx bxl-xing"></i>
            <span className={styles.logo_name}>SETTING</span>
          </div>
        </Link>
        <ul className={styles.nav_links}>
          <li className={dropdownStates.parametrage ? "" : styles.showMenu}>
            <div className={styles.iocn_link}>
              <Link href="/home/Parametrage">
                <i className="bx bx-cog"></i>
                <span className={styles.link_name}>Paramètrage Boutique</span>
              </Link>
              <i
                className={`${styles.arrow} bx bxs-chevron-down arrow`}
                onClick={() => toggleDropdown("parametrage")}
              ></i>
            </div>
            <ul className={styles.sub_menu}>
              <li>
                <Link className={styles.link_name} href="/home/Parametrage">
                  Paramètrage Boutique
                </Link>
              </li>
              <li>
                <Link href="/home/horaire">Horaire Boutique</Link>
              </li>
            </ul>
          </li>
          <li className={dropdownStates.commande ? "" : styles.showMenu}>
            <div className={styles.iocn_link}>
              <Link href="/home/Commande">
                <i className="bx bx-desktop"></i>
                <span className={styles.link_name}>Commande</span>
              </Link>
              <i
                className={`${styles.arrow} bx bxs-chevron-down arrow`}
                onClick={() => toggleDropdown("commande")}
              ></i>
            </div>
            <ul className={styles.sub_menu}>
              <li>
                <Link className={styles.link_name} href="/home/Commande">
                  Commande
                </Link>
              </li>
              <li>
                <Link href="/home/Uber">Uber</Link>
              </li>
            </ul>
          </li>
          <li className={dropdownStates.catalogue ? "" : styles.showMenu}>
            <div className={styles.iocn_link}>
              <Link href="/home/Catalogue">
                <i className="bx bx-receipt"></i>
                <span className={styles.link_name}>Catalogue</span>
              </Link>
              <i
                className={`${styles.arrow} bx bxs-chevron-down arrow`}
                onClick={() => toggleDropdown("catalogue")}
              ></i>
            </div>
            <ul className={styles.sub_menu}>
              <li>
                <Link className={styles.link_name} href="/home/Catalogue">
                  Catalogue
                </Link>
              </li>
              <li>
                <a href="" onClick={() => setIsOpen(true)}>Article</a>
              </li>
            </ul>
          </li>
          {isOpen && <Modal setIsOpen={setIsOpen} />}
          <li className={dropdownStates.application ? "" : styles.showMenu}>
            <div className={styles.iocn_link}>
              <Link href="/home/Application">
                <i className="bx bxs-dashboard"></i>
                <span className={styles.link_name}>Application</span>
              </Link>
              <i
                className={`${styles.arrow} bx bxs-chevron-down arrow`}
                onClick={() => toggleDropdown("application")}
              ></i>
            </div>
            <ul className={styles.sub_menu}>
              <li>
                <Link className={styles.link_name} href="/home/Application">
                  Application
                </Link>
              </li>
              <li>
                <Link href="" onClick={() => setIsOpen(true)}>Kiosk</Link>
              </li>
            </ul>
          </li>
          {isOpen && <Modale setIsOpen={setIsOpen} />}
        </ul>
      </div>
      <Navbar toggleSidebar={toggleSidebar} toggleMenu={toggleMenu} />
    </>
  );
}
