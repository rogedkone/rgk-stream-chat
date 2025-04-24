import { Flex } from "antd";
import s from "./_message.module.scss";
import { Assets } from "@renderer/shared/assets";

export const System = ({
  user_name,
  text,
  service,
}: {
  user_name: string;
  text: string;
  service: "goodgame";
}) => {
  const icons = {
    goodgame: <Assets.Svg.Logo.GoodGame className={s.icon} />,
  };

  return (
    <Flex align="center" justify="center" className={s.system} gap={4} wrap>
      {icons[service]}
      <b>{user_name}</b> <span className={s.text}>{text}</span>
    </Flex>
  );
};
