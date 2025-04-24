import { useGlobalStores } from "@renderer/store";
import { Header } from "@renderer/widgets/header";

import { observer } from "mobx-react-lite";
import { Chat, Settings } from "@renderer/pages";

import s from "./_app.module.scss";
import { Features } from "@renderer/features";
import useMessage from "antd/es/message/useMessage";

export const App = observer(() => {
  const { appStore } = useGlobalStores();
  const [msg, msgContext] = useMessage();

  const screens = {
    chat: <Chat />,
    settings: <Settings />,
  };

  const { screen, services } = appStore;

  return (
    <div className={s.app}>
      <Header />
      <div className={s.screen}>{screens[screen]}</div>
      <div className={s.footer}>
        {services.has("goodgame") && <Features.Services.GoodGame msg={msg} />}
      </div>
      {msgContext}
    </div>
  );
});
