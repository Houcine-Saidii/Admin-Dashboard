// data.interface.ts
export interface DataType {
    key: number;
    jour: string;
    etat: string;
    heureouv: string;
    heureferm: string;
    totalheure: string;
    children?: DataType[];
  }
  