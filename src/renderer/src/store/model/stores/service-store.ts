import { CardStatus, TCardUser } from "@renderer/entities/service/card/types";
import { makeAutoObservable } from "mobx";

export class ServiceStore {
  guests: number | null = null;
  users: TCardUser[] = [];
  status: CardStatus = "offline";
  isOpen: boolean = false;
  service: string;
  token: string | null = null;
  isAuth: boolean = false;

  constructor(service: string) {
    this.token = localStorage.getItem(`${service}:token`);
    this.isAuth = !!this.token;
    this.service = service;
    makeAutoObservable(this);
  }

  setField<K extends keyof this>(field: K, value: this[K]) {
    this[field] = value;
  }
}
