import s from "./_header.module.scss";

import { Button, Flex } from "antd";

import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useGlobalStores } from "@renderer/store";

import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  const { appStore } = useGlobalStores();
  const { screen } = appStore;
  return (
    <Flex className={s.header} justify="space-between" align="center">
      <b className={s.title}>RogedChat</b>
      <span className={s.move} />
      <Flex gap={8} style={{ height: "100%" }}>
        <Button
          type="text"
          onClick={() => {
            screen === "settings"
              ? appStore.setField("screen", "chat")
              : appStore.setField("screen", "settings");
          }}
          icon={
            <SettingOutlined
              style={{ color: screen === "settings" ? "cyan" : "" }}
              className={s.setting}
            />
          }
        />
        <Button
          type="text"
          icon={
            appStore.isMaximized ? (
              <FullscreenExitOutlined className={s.maximize} />
            ) : (
              <FullscreenOutlined className={s.maximize} />
            )
          }
          onClick={() => {
            if (appStore.isMaximized) {
              appStore.setField("isMaximized", false);
              window.electron.ipcRenderer.send("normalize");
            } else {
              appStore.setField("isMaximized", true);
              window.electron.ipcRenderer.send("maximize");
            }
          }}
        />
        <Button
          type="text"
          icon={<CloseOutlined className={s.close} />}
          className={s.close}
          onClick={() => window.electron.ipcRenderer.send("close")}
        />
      </Flex>
    </Flex>
  );
});
