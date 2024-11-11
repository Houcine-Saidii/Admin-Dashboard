import React, { useState } from "react";
import styles from "./visibilte.module.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEmporter, setIsEmporter] = useState(false);
  const [isKioskEmporter, setIsKioskEmporter] = useState(false);
  const [isSurPlace, setIsSurPlace] = useState(false);
  const [isKioskSurPlace, setIsKioskSurPlace] = useState(false);

  const handleVisibilityToggle = () => {
    const newValue = !isVisible;
    setIsVisible(newValue);
    setIsEmporter(newValue);
    setIsKioskEmporter(newValue);
    setIsSurPlace(newValue);
    setIsKioskSurPlace(newValue);
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Visibilité Article</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.zone}>
              <h5 className={styles.heading}>
                Article : "Désignation de l'article"
              </h5>
            </div>
            <div className={styles.zone1}>
              <h5>Visibilité</h5>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={isVisible}
                  onChange={handleVisibilityToggle}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.zone2}>
              <div className={styles.zone3}>
                <h5>Emporter</h5>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={isEmporter}
                    onChange={() => setIsEmporter(!isEmporter)}
                  />
                  <span className={styles.slider}></span>
                </label>
                <div className={styles.border}>
                  <span>KIOSK</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      className={styles.input}
                      checked={isKioskEmporter}
                      onChange={() => setIsKioskEmporter(!isKioskEmporter)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              <br />
              <br />
              <div className={styles.zone4}>
                <h5>Sur place</h5>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={isSurPlace}
                    onChange={() => setIsSurPlace(!isSurPlace)}
                  />
                  <span className={styles.slider}></span>
                </label>
                <div className={styles.border}>
                  <span>KIOSK</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      className={styles.input}
                      checked={isKioskSurPlace}
                      onChange={() => setIsKioskSurPlace(!isKioskSurPlace)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
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
