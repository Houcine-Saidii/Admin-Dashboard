import React from "react";
import styles from "./time.module.css";
import { RiCloseLine } from "react-icons/ri";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";

const format = "HH:mm";

dayjs.extend(customParseFormat);

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
  jour: string;
  onModalClose: (
    jour: string,
    zones: {
      key: number;
      heureOuverture: dayjs.Dayjs;
      heureFermeture: dayjs.Dayjs;
      isOpen: boolean;
    }[]
  ) => void;
  zones: {
    key: number;
    heureOuverture: dayjs.Dayjs;
    heureFermeture: dayjs.Dayjs;
    isOpen: boolean;
  }[];
  handleTimeChange: (
    zoneKey: number,
    timeType: "heureOuverture" | "heureFermeture",
    newTime: dayjs.Dayjs
  ) => void;
  setZones: React.Dispatch<
    React.SetStateAction<
      {
        key: number;
        heureOuverture: dayjs.Dayjs;
        heureFermeture: dayjs.Dayjs;
        isOpen: boolean;
      }[]
    >
  >;
  handleToggleSwitch: (zoneKey: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  setIsOpen,
  jour,
  onModalClose,
  zones,
  handleTimeChange,
  setZones,
  handleToggleSwitch,
}) => {
  const addZone = () => {
    if (zones.length < 2) {
      setZones((prevZones) => [
        ...prevZones,
        {
          key: prevZones.length + 1,
          heureOuverture: dayjs("00:00", format),
          heureFermeture: dayjs("00:00", format),
          isOpen: false,
        },
      ]);
    } else {
      alert("You can only add up to 2 zones.");
    }
  };

  const deleteZone = (key: number) => {
    setZones(zones.filter((zone) => zone.key !== key));
  };

  const toggleSwitch = (key: number) => {
    handleToggleSwitch(key);
  };

  const handleValidate = () => {
    onModalClose(jour, zones);
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Paramétrage Horaire</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.zone}>
              <div className={styles.head}>
                <span>Jour de la semaine : {jour}</span>
                <div className={styles.ouvferm}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      className={styles.input}
                      checked={zones.some((zone) => zone.isOpen)}
                      onChange={() => toggleSwitch(zones[0]?.key)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                  <span
                    style={{
                      color: zones.some((zone) => zone.isOpen)
                        ? "green"
                        : "red",
                    }}
                  >
                    {zones.some((zone) => zone.isOpen) ? "Ouvert" : "Fermé"}
                  </span>
                </div>
              </div>
              <div className={styles.zoneContent}>
                {zones.map((zone) => (
                  <div key={zone.key} className={styles.zone1}>
                    <div>
                      <span style={{ fontWeight: 600 }}>Heure d'Ouverture</span>
                      <TimePicker
                        style={{ width: 200, height: 30 }}
                        value={zone.heureOuverture}
                        format={format}
                        onChange={(time) =>
                          handleTimeChange(zone.key, "heureOuverture", time!)
                        }
                      />
                    </div>
                    <div>
                      <span style={{ fontWeight: 600 }}>
                        Heure de Fermeture
                      </span>
                      <TimePicker
                        style={{ width: 200, height: 30 }}
                        value={zone.heureFermeture}
                        format={format}
                        onChange={(time) =>
                          handleTimeChange(zone.key, "heureFermeture", time!)
                        }
                      />
                    </div>
                    <div>
                      <br />
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          className={styles.input}
                          checked={zone.isOpen}
                          onChange={() => toggleSwitch(zone.key)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                    <div>
                      <br />
                      <i
                        style={{ fontSize: "25px" }}
                        className="bx bx-trash-alt"
                        onClick={() => deleteZone(zone.key)}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.ajouter} onClick={addZone}>
                <i className="bx bx-plus"></i>
                <Link href="#">Ajouter</Link>
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
              <button className={styles.cancelBtn} onClick={handleValidate}>
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
