import React, { useState, useEffect } from "react";
import styles from "./suspension.module.css";
import { RiCloseLine } from "react-icons/ri";
import { Input } from "antd";
import Link from "next/link";

interface ModalProps {
  setIsOpene: (isOpene: boolean) => void;
  designation: string;
}

const allDays = [
  "Toute la semaine",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;
type Day = (typeof allDays)[number];

const Modal: React.FC<ModalProps> = ({ setIsOpene, designation }) => {
  const [duplicates, setDuplicates] = useState<number[]>([0]);
  const [schedules, setSchedules] = useState<Day[]>([...allDays]);
  const [toggleStates, setToggleStates] = useState<Record<Day, boolean>>(
    allDays.reduce(
      (acc, day) => ({ ...acc, [day]: false }),
      {} as Record<Day, boolean>
    )
  );

  const [inputValue, setInputValue] = useState<string>(designation);

  useEffect(() => {
    setInputValue(designation);
  }, [designation]);

  const handleDuplicate = () => {
    if (duplicates.length < 2) {
      setDuplicates([...duplicates, duplicates.length]);
    }
  };

  const handleDeleteDuplicate = (key: number) => {
    if (duplicates.length > 0) {
      setDuplicates(duplicates.filter((item) => item !== key));
    }
  };

  const handleDeleteSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
    const newToggleStates = { ...toggleStates };
    delete newToggleStates[schedules[index]];
    setToggleStates(newToggleStates);
  };

  const handleAddSchedule = () => {
    const missingDays = allDays.filter((day) => !schedules.includes(day));
    if (missingDays.length > 0) {
      const nextDay = missingDays[0];
      const nextDayIndex = allDays.findIndex((day) => day === nextDay);
      setSchedules([
        ...schedules.slice(0, nextDayIndex),
        nextDay,
        ...schedules.slice(nextDayIndex),
      ]);
      setToggleStates({ ...toggleStates, [nextDay]: false });
    }
  };

  const handleToggle = (day: Day) => {
    const newToggleStates = { ...toggleStates, [day]: !toggleStates[day] };
    if (day === "Toute la semaine") {
      const newState = !toggleStates[day];
      allDays.forEach((d) => (newToggleStates[d] = newState));
    }
    setToggleStates(newToggleStates);
  };

  const renderDuplicate = (key: number) => (
    <div className={styles.zone1} key={key}>
      <div className={styles.zone2}>
        <div>
          <input
            style={{ margin: "8px" }}
            className="form-check-input"
            type="checkbox"
            value=""
            id={`flexCheckDefault-${key}`}
          />
          <Input
            style={{ width: 100 }}
            size="middle"
            placeholder="Saisir"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.switch}>
            <input type="checkbox" className={styles.input} />
            <span className={styles.slider}></span>
          </label>
          <i
            style={{ fontSize: "25px" }}
            className="bx bx-trash-alt"
            onClick={() => handleDeleteDuplicate(key)}
          ></i>
        </div>
      </div>
      <div className={styles.zone3}>
        <div>
          <span>Date début</span>
          <input type="date" />
        </div>
        <br />
        <div>
          <span>Date de fin</span>
          <input type="date" />
        </div>
      </div>
      <div className={styles.dupliquer}>
        <i className="bx bx-plus"></i>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleDuplicate();
          }}
        >
          Dupliquer
        </Link>
      </div>
    </div>
  );

  const renderSchedule = (day: Day, index: number) => (
    <div className={styles.zone6} key={index}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.input}
          checked={toggleStates[day]}
          onChange={() => handleToggle(day)}
        />
        <span className={styles.slider}></span>
      </label>
      <span style={{ fontSize: "12px" }}>{day}</span>
      <div className={styles.zone7}>
        <span style={{ fontSize: "12px" }}>Indisponible</span>
        <input type="time" />
        <span>À</span>
        <input type="time" />
        {day !== "Toute la semaine" && (
          <i
            style={{ fontSize: "18px" }}
            className="bx bx-trash-alt"
            onClick={() => handleDeleteSchedule(index)}
          ></i>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpene(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Suspendre Vente</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpene(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.zone}>
              <span>CHOISIR LA PÉRIODE</span>
              {duplicates.map(renderDuplicate)}
              {duplicates.length < 2 && (
                <div className={styles.ajouter}>
                  <i className="bx bx-plus"></i>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDuplicate();
                    }}
                  >
                    Ajouter
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.zone4}>
              <span>CHOISIR L'HORAIRE</span>
              <div className={styles.zone5}>
                {schedules.map((day, index) => renderSchedule(day, index))}
              </div>
              {schedules.length < allDays.length && (
                <div className={styles.ajouterhor}>
                  <i className="bx bx-plus"></i>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddSchedule();
                    }}
                  >
                    Ajouter
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => setIsOpene(false)}
              >
                Annuler
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpene(false)}
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
