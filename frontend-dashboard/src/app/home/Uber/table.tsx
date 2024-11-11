import React, { useState } from "react";
import { Popover, Table } from "antd";
import type { TableColumnsType } from "antd";
import Link from "next/link";
import styles from "../home.module.css";
import Modal from "../../modal/Uber/livraison/suivi";
import Modale from "../../modal/Uber/infoclient/detail";
import Modalee from "../../modal/Uber/detailcmd/cmd";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface DataType {
  key: React.Key;
  numcmnd: number;
  originecmd: string;
  datecmd: string;
  dateretr: string;
  datelivr: string;
  inforclient: {
    nom: string;
    prenom: string;
    phone: string;
    email: string;
    deliveryAddress: string;
    additionalInfo: string;
  };
}

const data: DataType[] = [
  {
    key: "1",
    numcmnd: 100,
    originecmd: "Pizza",
    datecmd: "07/03/2024 10:00",
    dateretr: "07/03/2024 10:30",
    datelivr: "07/03/2024 15:00",
    inforclient: {
      nom: "Saidi",
      prenom: "Houcine",
      phone: "+21656469466",
      email: "houcinesaidi@gmail.com",
      deliveryAddress: "Rue de la Paix, Tunis",
      additionalInfo:
        "Bâtiment : 12, Etage : 2, Code 1 : 15, Interphone : 15, Remarque : appartement à gauche",
    },
  },
  {
    key: "2",
    numcmnd: 101,
    originecmd: "Hamburger",
    datecmd: "08/03/2024 09:00",
    dateretr: "08/03/2024 11:00",
    datelivr: "08/03/2024 16:00",
    inforclient: {
      nom: "Najar",
      prenom: "Ahmed",
      phone: "+21629180699",
      email: "ahmednajar@gmail.com",
      deliveryAddress: "Avenue de France, Tunis",
      additionalInfo:
        "Etage : 3, Code 1 : 45, Interphone : 25, Remarque : appartement à droite",
    },
  },
  {
    key: "3",
    numcmnd: 102,
    originecmd: "Pasta",
    datecmd: "09/03/2024 08:00",
    dateretr: "",
    datelivr: "09/03/2024 17:00",
    inforclient: {
      nom: "Tounsi",
      prenom: "Sonia",
      phone: "+21626899799",
      email: "soniatounsi@gmail.com",
      deliveryAddress: "Boulevard de l'Indépendance, Tunis",
      additionalInfo:
        "Bâtiment : 5, Etage : 4, Code 1 : 67, Interphone : 78, Remarque : appartement à droite",
    },
  },
  {
    key: "4",
    numcmnd: 103,
    originecmd: "Cheese Burger",
    datecmd: "10/03/2024 07:00",
    dateretr: "",
    datelivr: "10/03/2024 18:00",
    inforclient: {
      nom: "Memmi",
      prenom: "Momen",
      phone: "+21696522533",
      email: "momenmemmi@gmail.com",
      deliveryAddress: "Rue des Roses, Sousse",
      additionalInfo:
        "Bâtiment : 8, Etage : 3, Code 1 : 28, Interphone : 17, Remarque : appartement à droite",
    },
  },
  {
    key: "5",
    numcmnd: 104,
    originecmd: "Makloub",
    datecmd: "11/03/2024 06:00",
    dateretr: "",
    datelivr: "11/03/2024 19:00",
    inforclient: {
      nom: "Ben mohamed",
      prenom: "Ali",
      phone: "+21623456789",
      email: "alibenmohamed@gmail.com",
      deliveryAddress: "Rue elkawther, Houmt Souk Djerba Medenine",
      additionalInfo:
        "Bâtiment : 12, Etage : 2, Code 1 : 15, Interphone : 15, Remarque : appartement à gauche",
    },
  },
  {
    key: "6",
    numcmnd: 105,
    originecmd: "Libanais",
    datecmd: "12/03/2024 05:00",
    dateretr: "",
    datelivr: "12/03/2024 20:00",
    inforclient: {
      nom: "Toumi",
      prenom: "Nasr",
      phone: "+21623456789",
      email: "nasrtoumi@gmail.com",
      deliveryAddress: "Avenue Habib Bourguiba, Sfax",
      additionalInfo:
        "Bâtiment : 7, Etage : 4, Code 1 : 22, Interphone : 10, Remarque : appartement à droite",
    },
  },
  {
    key: "7",
    numcmnd: 106,
    originecmd: "Sushi",
    datecmd: "13/03/2024 04:00",
    dateretr: "",
    datelivr: "13/03/2024 21:00",
    inforclient: {
      nom: "Jendoubi",
      prenom: "Kamel",
      phone: "+21656789123",
      email: "kameljendoubi@gmail.com",
      deliveryAddress: "Avenue de Carthage, Carthage",
      additionalInfo:
        "Bâtiment : 6, Etage : 5, Code 1 : 10, Interphone : 20, Remarque : appartement à droite",
    },
  },
];

const App: React.FC<{
  searchQuery: string;
  dateRange: [Dayjs | null, Dayjs | null];
  statusFilter: string;
  empty: boolean;
}> = ({ searchQuery, dateRange, statusFilter, empty }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpene, setIsOpene] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    additionalInfo: "",
  });
  const [isOpenee, setIsOpenee] = useState(false);
  const [currentNumCmnd, setCurrentNumCmnd] = useState<number | null>(null);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

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
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "N°Cmd",
      dataIndex: "numcmnd",
      key: "numcmnd",
    },
    {
      title: "Origine Cmd",
      dataIndex: "originecmd",
      key: "originecmd",
    },
    {
      title: "Date Cmd",
      dataIndex: "datecmd",
      key: "datecmd",
    },
    {
      title: "Date de Retrait",
      dataIndex: "dateretr",
      key: "dateretr",
    },
    {
      title: "Date de Livraison",
      dataIndex: "datelivr",
      key: "datelivr",
    },
    {
      title: "Information client",
      dataIndex: "inforclient",
      key: "inforclient",
      render: (inforclient) => {
        const content = (
          <div>
            <p>
              {inforclient.email} <br />
              {inforclient.deliveryAddress} <br />
              {inforclient.additionalInfo}
            </p>
          </div>
        );
        return (
          <div>
            {`${inforclient.nom} ${inforclient.prenom}`},
            <br />
            {inforclient.phone}
            <br />
            <Popover
              content={content}
              title={`${inforclient.nom} ${inforclient.prenom}`}
              overlayStyle={{ width: "300px" }}
            >
              <Link
                href=""
                onClick={() => {
                  setClientInfo(inforclient);
                  setIsOpene(true);
                }}
              >
                Voir plus
              </Link>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Ticket Client",
      key: "tkclient",
      render: (_: DataType) => (
        <Link href="" onClick={() => setIsOpenee(true)}>
          <AiOutlineFileSearch className={styles.logo} />
        </Link>
      ),
    },
    {
      title: "Suivi Livraison",
      key: "suivlivr",
      render: (record: DataType) => (
        <div>
          <span>{getStatus(record.numcmnd)}</span>
          <br />
          <Link
            href=""
            onClick={() => {
              setCurrentNumCmnd(record.numcmnd);
              setIsOpen(true);
            }}
          >
            Acceder
          </Link>
          <FiMapPin className={styles.logo1} />
        </div>
      ),
    },
  ];

  const filteredData = data.filter((item) => {
    const isWithinDateRange =
      dateRange[0] && dateRange[1]
        ? dayjs(item.datecmd, "DD/MM/YYYY HH:mm").isBetween(
            dateRange[0],
            dateRange[1],
            null,
            "[]"
          )
        : true;

    const matchesSearchQuery =
      item.originecmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inforclient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inforclient.prenom
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.inforclient.phone
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.inforclient.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.inforclient.deliveryAddress
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.inforclient.additionalInfo
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatusFilter = statusFilter
      ? getStatus(item.numcmnd) === statusFilter
      : true;

    return isWithinDateRange && matchesSearchQuery && matchesStatusFilter;
  });

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
        dataSource={empty ? [] : filteredData}
      />
      {isOpen && currentNumCmnd !== null && (
        <Modal setIsOpen={setIsOpen} numcmnd={currentNumCmnd} />
      )}
      {isOpene && <Modale setIsOpene={setIsOpene} clientInfo={clientInfo} />}
      {isOpenee && <Modalee setIsOpenee={setIsOpenee} />}
    </div>
  );
};

export default App;
