import React, { useState } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import Link from "next/link";
import Modal from "./Paremetrage/local";
import styles from "./kiosk.module.css";

interface DataType {
  key: string;
  kiosk: string;
  ip: string;
  etat: string;
  status: string[];
  remarque: string;
}

let initialData: DataType[] = [
  {
    key: "1",
    kiosk: "kiosk 01",
    ip: "192.168.0.100",
    etat: "Synchronisée",
    status: ["En ligne"],
    remarque: "Remarque",
  },
  {
    key: "2",
    kiosk: "kiosk 02",
    ip: "192.168.0.101",
    etat: "Synchronisée",
    status: ["En ligne"],
    remarque: "Remarque",
  },
  {
    key: "3",
    kiosk: "kiosk 03",
    ip: "192.168.0.102",
    etat: "Non Synchronisée",
    status: ["Hors ligne"],
    remarque: "Remarque",
  },
  {
    key: "4",
    kiosk: "kiosk 04",
    ip: "192.168.0.103",
    etat: "Non Synchronisée",
    status: ["Hors ligne"],
    remarque: "Remarque",
  },
  {
    key: "5",
    kiosk: "kiosk 05",
    ip: "192.168.0.104",
    etat: "Non Synchronisée",
    status: ["Hors ligne"],
    remarque: "Remarque",
  },
];

interface TableProps {
  searchTerm: string;
}

const App: React.FC<TableProps> = ({ searchTerm }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [selectedKiosk, setSelectedKiosk] = useState<DataType | null>(null);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "KIOSK",
      dataIndex: "kiosk",
      key: "kiosk",
    },
    {
      title: "Adresse IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Etat",
      dataIndex: "etat",
      key: "etat",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color;
            if (tag === "En ligne") {
              color = "green";
            } else if (tag === "Hors ligne") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Remarque",
      dataIndex: "remarque",
      key: "remarque",
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <Link
          className={styles.logo}
          href=""
          onClick={() => {
            setSelectedKiosk(record);
            setIsOpen(true);
          }}
        >
          <i className="bx bx-cog"></i>
        </Link>
      ),
    },
  ];

  const handleStatusChange = (key: string, status: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: [status] } : item
      )
    );
  };

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
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
      {isOpen && selectedKiosk && (
        <Modal
          setIsOpen={setIsOpen}
          handleStatusChange={handleStatusChange}
          selectedKiosk={selectedKiosk}
        />
      )}
    </div>
  );
};

export default App;
