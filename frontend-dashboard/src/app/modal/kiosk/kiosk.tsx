import React, { useState } from "react";
import styles from "./kiosk.module.css";
import { RiCloseLine } from "react-icons/ri";
import Table from "./table";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>LISTE application : KIOSK</h5>
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table searchTerm={searchTerm} />
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
