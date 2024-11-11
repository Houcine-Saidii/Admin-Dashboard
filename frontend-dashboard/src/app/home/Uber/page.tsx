"use client";
import React, { useState } from "react";
import styles from "../home.module.css";
import { DatePicker, Select, Dropdown, Menu, message } from "antd";
import { IoClose } from "react-icons/io5";
import Table from "./table";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Link from "next/link";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export default function Uber() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [empty, setEmpty] = useState(false);

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null
  ) => {
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([null, null]);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  const handleMenuClick = (e: any) => {
    if (e.key === "0") {
      setEmpty(true);
      message.info("All deliveries have been canceled.");
    }
  };
  const items = [
    {
      label: (
        <>
          <IoClose />
          <span className={styles.text}> Annuler la livraison</span>
        </>
      ),
      key: "0",
    },
  ];
  return (
    <div className={styles.home_section}>
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="/home">ETK SETTINGS</Link>
        </li>
        <li>
          <Link href="/home/Commande">Commande</Link>
        </li>
        <li>
          <Link href="#">Uber</Link>
        </li>
      </ul>
      <div className={styles.zone}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RangePicker className={styles.date} onChange={handleDateRangeChange} />
        <Select
          defaultValue="Toutes les commandes"
          style={{ width: 190 }}
          onChange={handleStatusChange}
          options={[
            { value: "", label: "Toutes les commandes" },
            { value: "Attente", label: "Attente" },
            { value: "Retrait", label: "Retrait" },
            { value: "Livré", label: "Livré" },
            { value: "Annulé", label: "Annulé" },
          ]}
        />
        <div className={styles.dots}>
          <Dropdown
            overlay={<Menu onClick={handleMenuClick} items={items} />}
            trigger={["click"]}
          >
            <i
              className="bx bx-dots-vertical-rounded"
              onClick={(e) => e.preventDefault()}
            ></i>
          </Dropdown>
        </div>
      </div>
      <Table
        searchQuery={searchQuery}
        dateRange={dateRange}
        statusFilter={statusFilter}
        empty={empty}
      />
    </div>
  );
}
