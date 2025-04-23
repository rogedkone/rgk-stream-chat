import { observer } from "mobx-react-lite";

import s from "./_services.module.scss";

import { GoodGameService } from "./good-game";

export const Services = observer(() => {
  return (
    <div className={s.services}>
      <GoodGameService />
    </div>
  );
});
