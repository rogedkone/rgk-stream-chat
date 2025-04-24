export const authChannel = async (wss: WebSocket, token: string) => {
  wss.send(
    JSON.stringify({
      type: "auth",
      data: { user_id: 1664796, token },
    })
  );
};

export const joinChannel = async (wss: WebSocket, channel_id: string) => {
  wss.send(
    JSON.stringify({
      type: "join",
      data: { channel_id, hidden: 0, reload: false },
    })
  );
};

export const getUsers = (wss: WebSocket) => {
  wss.send(
    JSON.stringify({
      type: "get_users_list2",
      data: { channel_id: "212066" },
    })
  );

  return setTimeout(() => {
    getUsers(wss);
  }, 5000);
};
