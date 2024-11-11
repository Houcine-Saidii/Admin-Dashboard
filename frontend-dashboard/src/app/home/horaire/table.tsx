import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import Link from "next/link";
import styles from "../home.module.css";
import Modal from "../../modal/time/time";
import { RxCountdownTimer } from "react-icons/rx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface DataType {
  key: React.Key;
  jour: string;
  etat: string;
  heureouv: string;
  heureferm: string;
  totalheure: string;
  children?: DataType[];
}

let data: DataType[] = [
  {
    key: "1",
    jour: "Lundi",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "1-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "1-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
  {
    key: "2",
    jour: "Mardi",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "2-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "2-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
  {
    key: "3",
    jour: "Mercredi",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "3-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "3-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
  {
    key: "4",
    jour: "Jeudi",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "4-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "4-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
  {
    key: "5",
    jour: "Vendredi",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "5-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "5-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
  {
    key: "6",
    jour: "Samedi",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "6-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "6-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
  {
    key: "7",
    jour: "Dimanche",
    etat: "Ouvert",
    heureouv: "",
    heureferm: "",
    totalheure: "08:00",
    children: [
      {
        key: "7-1",
        jour: "",
        etat: "",
        heureouv: "09:00",
        heureferm: "13:00",
        totalheure: "04:00",
      },
      {
        key: "7-2",
        jour: "",
        etat: "",
        heureouv: "14:00",
        heureferm: "18:00",
        totalheure: "04:00",
      },
    ],
  },
];

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [tableData, setTableData] = useState<DataType[]>(data);
  const [zones, setZones] = useState([
    {
      key: 1,
      heureOuverture: dayjs("00:00", "HH:mm"),
      heureFermeture: dayjs("00:00", "HH:mm"),
      isOpen: true,
    },
    {
      key: 2,
      heureOuverture: dayjs("00:00", "HH:mm"),
      heureFermeture: dayjs("00:00", "HH:mm"),
      isOpen: true,
    },
  ]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleModalClose = (
    jour: string,
    updatedZones: {
      key: number;
      heureOuverture: dayjs.Dayjs;
      heureFermeture: dayjs.Dayjs;
      isOpen: boolean;
    }[]
  ) => {
    const newData = tableData.map((day) => {
      if (day.jour === jour) {
        const isAnyZoneOpen = updatedZones.some((zone) => zone.isOpen);
        return {
          ...day,
          etat: isAnyZoneOpen ? "Ouvert" : "Fermé",
          children: isAnyZoneOpen
            ? updatedZones
                .filter((zone) => zone.isOpen)
                .map((zone) => ({
                  key: `${day.key}-${zone.key}`,
                  jour: "",
                  etat: "",
                  heureouv: zone.heureOuverture.format("HH:mm"),
                  heureferm: zone.heureFermeture.format("HH:mm"),
                  totalheure: calculateTotalHeure(
                    zone.heureOuverture,
                    zone.heureFermeture
                  ),
                }))
            : undefined,
          totalheure: isAnyZoneOpen
            ? calculateTotalHeureInParent(
                updatedZones
                  .filter((zone) => zone.isOpen)
                  .map((zone) => ({
                    heureOuverture: zone.heureOuverture,
                    heureFermeture: zone.heureFermeture,
                  }))
              )
            : "00:00",
        };
      }
      return day;
    });
    setTableData(newData);
    setZones(updatedZones); // Update the zones state with the new zones
    setIsOpen(false);
  };

  const calculateTotalHeure = (
    heureOuverture: dayjs.Dayjs,
    heureFermeture: dayjs.Dayjs
  ) => {
    const diff = heureFermeture.diff(heureOuverture, "minute");
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateTotalHeureInParent = (
    childZones: { heureOuverture: dayjs.Dayjs; heureFermeture: dayjs.Dayjs }[]
  ) => {
    const totalMinutes = childZones.reduce((acc, zone) => {
      const diff = zone.heureFermeture.diff(zone.heureOuverture, "minute");
      return acc + diff;
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeChange = (
    zoneKey: number,
    timeType: "heureOuverture" | "heureFermeture",
    newTime: dayjs.Dayjs
  ) => {
    const updatedZones = zones.map((zone) => {
      if (zone.key === zoneKey) {
        return {
          ...zone,
          [timeType]: newTime,
        };
      }
      return zone;
    });

    setZones(updatedZones);
  };

  const handleToggleSwitch = (zoneKey: number) => {
    const updatedZones = zones.map((zone) => {
      if (zone.key === zoneKey) {
        return {
          ...zone,
          isOpen: !zone.isOpen,
        };
      }
      return zone;
    });

    setZones(updatedZones);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Jour de la Semaine",
      dataIndex: "jour",
      key: "jour",
    },
    {
      title: "Etat",
      dataIndex: "etat",
      key: "etat",
    },
    {
      title: "Heure Ouverture",
      dataIndex: "heureouv",
      key: "heureouv",
    },
    {
      title: "Heure Fermeture",
      dataIndex: "heureferm",
      key: "heureferm",
    },
    {
      title: "Total Heure",
      dataIndex: "totalheure",
      key: "totalheure",
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => {
        if (record.children || record.etat === "Fermé") {
          return (
            <Link
              className={styles.logo}
              href=""
              onClick={(e) => {
                e.preventDefault();
                setSelectedDay(record.jour);
                setIsOpen(true);
              }}
            >
              <i className="bx bx-cog"></i>
              <RxCountdownTimer />
            </Link>
          );
        }
        return null;
      },
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
        dataSource={tableData}
      />
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          jour={selectedDay}
          onModalClose={handleModalClose}
          zones={zones}
          handleTimeChange={handleTimeChange}
          setZones={setZones}
          handleToggleSwitch={handleToggleSwitch}
        />
      )}
    </div>
  );
};

export default App;
