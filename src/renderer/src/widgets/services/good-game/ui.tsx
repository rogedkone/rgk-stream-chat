import { useState } from "react";
import { Service } from "../service";
import { Modal } from "antd";
import { Features } from "@renderer/features";
import useMessage from "antd/es/message/useMessage";
import { observer } from "mobx-react-lite";
import { useGlobalStores } from "@renderer/store";

export const GoodGameService = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, msgContext] = useMessage();
  const { goodGameStore } = useGlobalStores();

  return (
    <>
      {goodGameStore.token && <Features.Sockets.GoodGame />}
      <Modal
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <Features.Auth.GoodGame msg={msg} />
      </Modal>
      <Service
        icon="goodGame"
        guests={goodGameStore.clients}
        users={goodGameStore.users.length}
        status={goodGameStore.status}
        onClick={() => setIsOpen(true)}
      />
      {msgContext}
    </>
  );
});
