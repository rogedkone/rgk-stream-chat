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
