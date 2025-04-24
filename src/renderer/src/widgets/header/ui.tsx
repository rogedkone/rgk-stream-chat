import s from "./_header.module.scss";
import { useGlobalStores } from "@renderer/store";
import { observer } from "mobx-react-lite";
import { Assets } from "@renderer/shared/assets";

export const Header = observer(() => {
  const { appStore } = useGlobalStores();

  const { screen } = appStore;
  return (
    <div className={s.header}>
      <b className={s.title}>RogedChat</b>
      <span className={s.move} />
      <div className={s.buttons}>
        <Assets.Svg.Icons.Gear
          className={screen === "settings" ? s.selected : s.settings}
          onClick={() => {
            screen === "settings"
              ? appStore.setField("screen", "chat")
              : appStore.setField("screen", "settings");
          }}
        />

        {appStore.isMaximized ? (
          <Assets.Svg.Icons.Normalize
            className={s.maximize}
            onClick={() => {
              appStore.setField("isMaximized", false);
              window.electron.ipcRenderer.send("normalize");
            }}
          />
        ) : (
          <Assets.Svg.Icons.Maximize
            className={s.maximize}
            onClick={() => {
              appStore.setField("isMaximized", true);
              window.electron.ipcRenderer.send("maximize");
            }}
          />
        )}
        <Assets.Svg.Icons.Cross
          className={s.close}
          onClick={() => window.electron.ipcRenderer.send("close")}
        />
      </div>
    </div>
  );
});
