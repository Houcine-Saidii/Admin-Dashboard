import React, { useState, useEffect } from "react";
import { Space, Table, Input } from "antd";
import type { TableColumnsType } from "antd";
import Switch from "../../Components/switch";
import Link from "next/link";
import Modal from "./visibilite/visibilite";
import Modale from "./suspension/suspension";

interface DataType {
  key: React.Key;
  designation: string;
  catégorie: string;
  rapture: boolean;
}

const initialData: DataType[] = [
  {
    key: "1",
    designation: "Coca Cola",
    catégorie: "Boissons",
    rapture: true,
  },
  {
    key: "2",
    designation: "Tiramisu",
    catégorie: "Dessert",
    rapture: false,
  },
  {
    key: "3",
    designation: "Burger XXL",
    catégorie: "Burger",
    rapture: false,
  },
  {
    key: "4",
    designation: "Pepsi",
    catégorie: "Boissons",
    rapture: true,
  },
  {
    key: "5",
    designation: "Cheesecake",
    catégorie: "Dessert",
    rapture: false,
  },
  {
    key: "6",
    designation: "Veggie Burger",
    catégorie: "Burger",
    rapture: false,
  },
];

interface TableProps {
  searchTerm: string;
  rapture: boolean | null;
}

const App: React.FC<TableProps> = ({ searchTerm, rapture }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<DataType[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpene, setIsOpene] = useState(false);
  const [editingRow, setEditingRow] = useState<DataType | null>(null);
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");

  useEffect(() => {
    if (rapture !== null) {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          rapture: rapture,
        }))
      );
    }
  }, [rapture]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleSwitchChange = (key: React.Key, checked: boolean) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, rapture: checked };
      }
      return item;
    });
    setData(newData);
  };

  const handleDelete = (key: React.Key, e: React.MouseEvent) => {
    e.preventDefault();
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleEdit = (record: DataType, e: React.MouseEvent) => {
    e.preventDefault();
    setEditingRow(record);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setData(
      data.map((item) => (item.key === editingRow?.key ? editingRow : item))
    );
    setEditingRow(null);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditingRow(null);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Désignation",
      dataIndex: "designation",
      render: (text: string, record: DataType) =>
        editingRow?.key === record.key ? (
          <Input
            value={editingRow.designation}
            onChange={(e) =>
              setEditingRow({ ...editingRow, designation: e.target.value })
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Catégorie Parente",
      dataIndex: "catégorie",
      render: (text: string, record: DataType) =>
        editingRow?.key === record.key ? (
          <Input
            value={editingRow.catégorie}
            onChange={(e) =>
              setEditingRow({ ...editingRow, catégorie: e.target.value })
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Rupture",
      dataIndex: "rapture",
      render: (rapture: boolean, record: DataType) => (
        <Switch
          checked={rapture}
          onChange={(checked: boolean) =>
            handleSwitchChange(record.key, checked)
          }
        />
      ),
    },
    {
      title: "Visibilité",
      render: (_, record: DataType) =>
        record.rapture ? (
          <Link href="" onClick={() => setIsOpen(true)}>
            Accéder
          </Link>
        ) : null,
    },
    {
      title: "Suspension vente",
      render: (_, record: DataType) =>
        record.rapture ? (
          <Link
            href=""
            onClick={(e) => {
              e.preventDefault();
              setSelectedDesignation(record.designation);
              setIsOpene(true);
            }}
          >
            Accéder
          </Link>
        ) : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        editingRow?.key === record.key ? (
          <Space size="middle">
            <Link style={{ color: "green" }} href="" onClick={handleSave}>
              Save
            </Link>
            <Link style={{ color: "red" }} href="" onClick={handleCancel}>
              Cancel
            </Link>
          </Space>
        ) : (
          <Space size="middle">
            <Link href="" onClick={(e) => handleEdit(record, e)}>
              Edit
            </Link>
            <Link href="" onClick={(e) => handleDelete(record.key, e)}>
              Delete
            </Link>
          </Space>
        ),
    },
  ];

  const filteredData = data.filter((item) =>
    item.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        pagination={{ pageSize: 4 }}
      />
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      {isOpene && (
        <Modale setIsOpene={setIsOpene} designation={selectedDesignation} />
      )}
    </div>
  );
};

export default App;
