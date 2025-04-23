import { useGlobalStores } from "@renderer/store";
import { Header } from "@renderer/widgets/header";
import { Services } from "@renderer/widgets/services";
import { Flex } from "antd";
import useMessage from "antd/es/message/useMessage";
import { observer } from "mobx-react-lite";

import s from "./_app.module.scss";
import { Chat, Settings } from "@renderer/pages";

export const App = observer(() => {
  const [msg, msgContext] = useMessage();
  const { goodGameStore, appStore } = useGlobalStores();

  const screens = {
    chat: <Chat />,
    settings: <Settings />,
  };

  return (
    <Flex vertical className={s.app}>
      <Header />
      <Flex
        vertical
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          overflow: "hidden",
        }}
      >
        {screens[appStore.screen]}
      </Flex>
      <Services />
      {msgContext}
    </Flex>
  );
});
