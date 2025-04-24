export type CardStatus = "online" | "offline" | "error" | "connecting";

export type TCardUser = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};
export type CardProps = {
  icon: "goodgame";
  guests: number | null;
  users: TCardUser[];
  status: CardStatus;
  onClick: () => void;
};
