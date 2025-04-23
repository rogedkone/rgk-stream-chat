import { makeAutoObservable } from "mobx";

interface IUser {
  baninfo: boolean;
  banned: boolean;
  hidden: number;
  id: number;
  name: string;
  username: string;
  avatar: string;
  payments: number;
  premium: number;
  // premiums: [];
  // resubs: {};
  rights: number;
  staff: number;
  regtime: number;
  ggPlusTier: number;
  role: string;
  invites: { [key: string]: number };
  inviteLevels: { [key: string]: number };
}

export class GoodGameStore {
  isAuth: boolean = false;
  token: string | null = null;
  clients: number | null = null;
  users: IUser[] = [];
  status: "online" | "offline" | "error" | "connecting" = "offline";

  constructor() {
    makeAutoObservable(this);
  }

  setField<K extends keyof this>(field: K, value: this[K]) {
    this[field] = value;
  }
}
