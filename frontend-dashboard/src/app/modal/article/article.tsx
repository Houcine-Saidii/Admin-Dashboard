import React, { useState } from "react";
import styles from "./article.module.css";
import { RiCloseLine } from "react-icons/ri";
import Table from "./table";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rapture, setRapture] = useState<boolean | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span className={styles.text} onClick={() => setRapture(false)}>
          Activer la rapture de stock
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span className={styles.text} onClick={() => setRapture(true)}>
          Désactiver la rapture de stock
        </span>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>LISTE ARTICLE</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.zone}>
              <input
                className={styles.search}
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className={styles.dots}>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <i
                    className="bx bx-dots-vertical-rounded"
                    onClick={(e) => e.preventDefault()}
                  ></i>
                </Dropdown>
              </div>
            </div>
            <Table searchTerm={searchTerm} rapture={rapture} />
          </div>
          <div className={styles.actionsContainer}>
            <button
              className={styles.deleteBtn}
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsOpen(false)}
            >
              Validé
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
