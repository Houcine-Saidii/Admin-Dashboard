import React from "react";
import styles from "./suivi.module.css";
import { RiCloseLine } from "react-icons/ri";
import Table from "./table";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
  numcmnd: number;
}

const Modal: React.FC<ModalProps> = ({ setIsOpen, numcmnd }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Suivi livraison uber direct</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.zone}>
              <h6 className={styles.heading}>N° commande : {numcmnd}</h6>
              <h6 className={styles.heading}>Nombre de livreur: 3</h6>
            </div>
            <Table numcmnd={numcmnd}></Table>
          </div>
          <div className={styles.modalActions}>
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
      </div>
    </>
  );
};

export default Modal;
