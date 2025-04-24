export interface IGoodGameMessageEvent {
  type: "message";
  data: IGoodGameMessage;
}

export interface IGoodGameMessage {
  channel_id: string;
  user_id: number;
  user_name: string;
  user_rights: number;
  premium: number;
  premiums: string[];
  resubs: Record<string, number>;
  staff: number;
  color: string;
  icon: string;
  role: string;
  mobile: number;
  payments: number;
  paymentsAll: Record<string, number>;
  gg_plus_tier: number;
  isStatus: number;
  message_id: number;
  timestamp: number;
  text: string;
  regtime: number;
  invites: Record<string, number>;
  inviteLevels: Record<string, number>;
}

export interface IGoodGameUser {
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

export interface IFollowerEvent {
  type: "follower";
  data: {
    userId: number;
    user_id: number;
    username: string;
    userName: string;
    channel_id: number;
  };
}

export interface IMessageEvent {
  type: "message";
  data: {
    channel_id: string;
    user_id: number;
    user_name: string;
    user_rights: number;
    premium: number;
    premiums: string[];
    resubs: Record<string, number>;
    staff: number;
    color: string;
    icon: string;
    role: string;
    mobile: number;
    payments: number;
    paymentsAll: Record<string, number>;
    gg_plus_tier: number;
    isStatus: number;
    message_id: number;
    timestamp: number;
    text: string;
    regtime: number;
    invites: Record<string, number>;
    inviteLevels: Record<string, number>;
  };
}

export interface IUsersListEvent {
  type: "users_list";
  data: {
    clients_in_channel: number;
    users: IGoodGameUser[];
  };
}
