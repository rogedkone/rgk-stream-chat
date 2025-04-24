import { CardProps } from "@renderer/entities/service";

export type TServiceCardStore = {
  isOpen: boolean;
  isAuth: boolean;
  service: string;
  token: string;
} & Omit<CardProps, "icon" | "onClick">;
