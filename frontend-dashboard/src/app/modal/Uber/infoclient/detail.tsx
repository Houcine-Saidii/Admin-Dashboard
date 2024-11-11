import React from "react";
import styles from "./detail.module.css";
import { RiCloseLine } from "react-icons/ri";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface ModalProps {
  setIsOpene: (isOpene: boolean) => void;
  clientInfo: {
    nom: string;
    prenom: string;
    phone: string;
    email: string;
    deliveryAddress: string;
    additionalInfo: string;
  };
}

const Modal: React.FC<ModalProps> = ({ setIsOpene, clientInfo }) => {
  const data = [
    { key: "1", label: "Nom", value: clientInfo.nom },
    { key: "2", label: "Prénom", value: clientInfo.prenom },
    { key: "3", label: "Numéro Téléphone", value: clientInfo.phone },
    { key: "4", label: "Adresse mail", value: clientInfo.email },
    {
      key: "5",
      label: "Adresse de Livraison",
      value: clientInfo.deliveryAddress,
    },
    {
      key: "6",
      label: "Complément d'information",
      value: clientInfo.additionalInfo,
    },
  ];

  const columns: TableColumnsType<{
    key: React.Key;
    label: string;
    value: string;
  }> = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      render: (text: string) => <strong>{text}</strong>,
      width: 180,
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpene(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Information Client</h5>
          </div>
          <RiCloseLine
            className={styles.closeBtn}
            onClick={() => setIsOpene(false)}
          />
          <div className={styles.modalContent}>
            <div className={styles.zone}>
              <h6 className={styles.heading}>
                Client : {clientInfo.prenom} {clientInfo.nom}
              </h6>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="middle"
            />
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
