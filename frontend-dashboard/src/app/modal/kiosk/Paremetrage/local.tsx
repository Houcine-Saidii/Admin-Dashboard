import React, { useState } from "react";
import styles from "./local.module.css";
import { RiCloseLine } from "react-icons/ri";
import { FcIdea, FcPhoneAndroid } from "react-icons/fc";
import {
  GiReceiveMoney,
  GiRingingAlarm,
  GiShoppingBag,
  GiTakeMyMoney,
} from "react-icons/gi";
import { IoCardOutline, IoFastFoodOutline } from "react-icons/io5";
import { IoMdPower } from "react-icons/io";
import { FaCommentSms, FaCreditCard, FaPowerOff } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { SiMoneygram } from "react-icons/si";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { MdOutlinePowerOff } from "react-icons/md";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <><MdOutlinePowerOff />{"  "}<span>FERMER L'APPLICATION</span></>,
  },
  {
    key: "2",
    label: <><IoMdPower />{"  "}<span>DÉMARRER L'APPLICATION</span></>,
  },
];

interface ModalProps {
  setIsOpen: (isOpene: boolean) => void;
  handleStatusChange: (key: string, status: string) => void;
  selectedKiosk: { key: string };
}
const OptionsPage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Options</h4>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.facebook}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <i className={`${styles.fab} bx bx-user`}></i>
            </div>
            <div className={styles.name}>Compte Client</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.twitter}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <i className={`${styles.fab} bx bx-handicap`}></i>
            </div>
            <div className={styles.name}>PMR/Enfant</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.instagram}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <FcIdea className={styles.fab} />
            </div>
            <div className={styles.name}>Demande d'aide</div>
          </div>
        </label>
      </div>
    </div>
  </section>
);
const ModesDeVentePage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Modes de vente</h4>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.facebook}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <IoFastFoodOutline className={styles.fab} />
            </div>
            <div className={styles.name}>Sur place</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.twitter}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <GiShoppingBag className={styles.fab} />
            </div>
            <div className={styles.name}>A emporter</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.instagram}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <GiReceiveMoney className={styles.fab} />
            </div>
            <div className={styles.name}>Retrait C&C</div>
          </div>
        </label>
      </div>
    </div>
  </section>
);
const MoyensDePaiementPage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Moyens de paiement</h4>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.facebook}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <GrMoney className={styles.fab} />
            </div>
            <div className={styles.name}>Sur place</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.twitter}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <FaCreditCard className={styles.fab} />
            </div>
            <div className={styles.name}>A emporter</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.instagram}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <GiTakeMyMoney className={styles.fab} />
            </div>
            <div className={styles.name}>Retrait C&C</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.whatsup}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <SiMoneygram className={styles.fab} />
            </div>
            <div className={styles.name}>BDP</div>
          </div>
        </label>
      </div>
    </div>
  </section>
);
const ModesDInformationPage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Modes d'information</h4>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.facebook}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <FcPhoneAndroid className={styles.fab} />
            </div>
            <div className={styles.name}>Numéro de chevalet</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.twitter}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <FaCommentSms className={styles.fab} />
            </div>
            <div className={styles.name}>SMS</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.instagram}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <GiRingingAlarm className={styles.fab} />
            </div>
            <div className={styles.name}>Numéro de bipeur</div>
          </div>
        </label>
      </div>
    </div>
  </section>
);
const CompteClientPage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Compte client</h4>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.facebook}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <i className={`${styles.fab} bx bx-dialpad`}></i>
            </div>
            <div className={styles.name}>Numéro de téléphone</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.twitter}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <IoCardOutline className={styles.fab} />
            </div>
            <div className={styles.name}>Carte de fidélité</div>
          </div>
        </label>
      </div>
    </div>
  </section>
);
const LanguesPage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Langues</h4>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.facebook}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <div className={styles.search1}></div>
            </div>
            <div className={styles.name}>Français</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.twitter}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <div className={styles.search2}></div>
            </div>
            <div className={styles.name}>Espagnol</div>
          </div>
        </label>
        <label className={styles.option_item}>
          <input type="checkbox" className={styles.checkbox} />
          <div className={`${styles.option_inner} ${styles.instagram}`}>
            <div className={styles.tickmark}></div>
            <div className={styles.icon}>
              <div className={styles.search3}></div>
            </div>
            <div className={styles.name}>Englais</div>
          </div>
        </label>
      </div>
    </div>
  </section>
);
const EcranPublicitairePage: React.FC = () => (
  <section className={styles.home_section}>
    <div className={styles.home_content}>
      <h4>Ecran publicitaire</h4>
    </div>
    <div className={styles.zone1}>
      <span>Etat actif</span>
      <span>Etat en veille</span>
    </div>
    <hr className={styles.ligne} />
    <span className={styles.text}>Liste de lecture</span>
    <div className={styles.zone2}>
      <div className={styles.zone3}>
        <p>Ordre</p>
        <p>Image ou video</p>
        <p>Actions</p>
      </div>
      <hr className={styles.ligne2} />
      <div className={styles.zone4}>
        <p>1</p>
        <p>activeStateScreen.webm</p>
        <label className={styles.switch}>
          <input type="checkbox" className={styles.input} />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  </section>
);
const Modal: React.FC<ModalProps> = ({ setIsOpen, handleStatusChange, selectedKiosk }) => {
  const [selectedOption, setSelectedOption] = useState<string>("Options");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };
  const getPageContent = (option: string) => {
    switch (option) {
      case "Options":
        return <OptionsPage />;
      case "Modes de vente":
        return <ModesDeVentePage />;
      case "Moyens de paiement":
        return <MoyensDePaiementPage />;
      case "Modes d'information":
        return <ModesDInformationPage />;
      case "Compte client":
        return <CompteClientPage />;
      case "Langues":
        return <LanguesPage />;
      case "Ecran publicitaire":
        return <EcranPublicitairePage />;
      default:
        return null;
    }
  };
  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      handleStatusChange(selectedKiosk.key, "Hors ligne");
    } else if (e.key === "2") {
      handleStatusChange(selectedKiosk.key, "En ligne");
    }
    setIsOpen(false);
  };
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Paramétrage local</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.sidebar}>
              <ul className={styles.nav_links}>
                {[
                  "Options",
                  "Modes de vente",
                  "Moyens de paiement",
                  "Modes d'information",
                  "Compte client",
                  "Langues",
                  "Ecran publicitaire",
                ].map((option) => (
                  <li key={option}>
                    <a href="#" onClick={() => handleOptionClick(option)}>
                      <span className={styles.link_name}>{option}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {getPageContent(selectedOption)}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <Dropdown menu={{ items, onClick: handleMenuClick }} placement="topLeft" arrow>
                <div className={styles.menusurf}>
                <i className={`${styles.menu} bx bx-menu-alt-left`}></i>
                </div>
              </Dropdown>
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
