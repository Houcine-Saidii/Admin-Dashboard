import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import Link from "next/link";
import styles from "../../../home/home.module.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";

const getStatus = (numcmnd: number) => {
  switch (numcmnd) {
    case 100:
    case 101:
      return "Retrait";
    case 102:
    case 103:
      return "Attente";
    case 104:
    case 105:
      return "Livré";
    case 106:
      return "Annulé";
    default:
      return "Unknown";
  }
};

interface DataType {
  key: React.Key;
  idcmd: number;
  etat: string;
  dateprevu: string;
  dateprevuliv: string;
  livreur: string;
  motifanul: string;
}

interface TableProps {
  numcmnd: number;
}

const App: React.FC<TableProps> = ({ numcmnd }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const data: DataType[] = [
    {
      key: "1",
      idcmd: numcmnd,
      etat: getStatus(numcmnd),
      dateprevu: "03/05/2024 10:15",
      dateprevuliv: "03/05/2024 10:15",
      livreur: "Glovo",
      motifanul: "",
    },
    {
      key: "2",
      idcmd: numcmnd,
      etat: "Attente",
      dateprevu: "03/05/2024 10:15",
      dateprevuliv: "03/05/2024 10:15",
      livreur: "Aramex",
      motifanul: "Client ne répond pas",
    },
    {
      key: "3",
      idcmd: numcmnd,
      etat: "Annulé",
      dateprevu: "03/05/2024 10:15",
      dateprevuliv: "03/05/2024 10:15",
      livreur: "Yassir",
      motifanul: "Adresse erroné",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID Cmd Uber direct",
      dataIndex: "idcmd",
      key: "idcmd",
      width: 80,
    },
    {
      title: "Etat",
      dataIndex: "etat",
      key: "etat",
      width: 70,
    },
    {
      title: "Date prévu de retrait",
      dataIndex: "dateprevu",
      key: "dateprevu",
      width: 100,
    },
    {
      title: "Date prévu de livraison",
      dataIndex: "dateprevuliv",
      key: "dateprevuliv",
      width: 100,
    },
    {
      title: "Livreur",
      dataIndex: "livreur",
      key: "livreur",
      width: 70,
    },
    {
      title: "Preuve de livraison",
      key: "tkclient",
      width: 80,
      render: (_: DataType) => (
        <Link href="">
          <AiOutlineFileSearch className={styles.logo} />
        </Link>
      ),
    },
    {
      title: "Motif d'annulation",
      dataIndex: "motifanul",
      key: "motifanul",
      width: 100,
    },
    {
      title: "Suivi",
      key: "suivlivr",
      width: 70,
      render: (_: DataType) => <FiMapPin style={{ fontSize: 23 }} />,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 930, y: 270 }}
      />
    </div>
  );
};

export default App;
