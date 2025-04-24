import { Flex } from "antd";
import s from "./_message.module.scss";

import { Assets } from "@renderer/shared/assets";

export const User = ({
  user_name,
  text,
  service,
}: {
  user_name: string;
  text: string;
  service: "goodgame";
}) => {
  const icons = {
    goodgame: (
      <Assets.Svg.Logo.GoodGame className={`${s.icon} ${s[service]}`} />
    ),
  };
  return (
    <Flex align="center" className={`${s.user} ${s[service]}`} gap={4} wrap>
      {icons[service]}
      <b>{user_name}:</b> <span>{text}</span>
    </Flex>
  );
};
