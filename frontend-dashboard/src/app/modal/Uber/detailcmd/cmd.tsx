import React from "react";
import styles from "./cmd.module.css";
import { RiCloseLine } from "react-icons/ri";
import { Image } from 'antd';

interface ModalProps {
  setIsOpenee: (isOpenee: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setIsOpenee }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpenee(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Details de la commande</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpenee(false)}
          />
          <div className={styles.modalContent}>
            <Image
              width={333}
              src="/recu.png" 
            />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => setIsOpenee(false)}
              >
                Annuler
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpenee(false)}
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
