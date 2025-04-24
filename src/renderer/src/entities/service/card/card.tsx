import { Assets } from "@renderer/shared/assets";
import { Flex } from "antd";
import s from "./_card.module.scss";
import { CardProps } from "./types";

export const Card = ({
  icon,
  guests,
  users,
  status = "offline",
  onClick,
}: CardProps) => {
  const svgIcons = {
    goodgame: <Assets.Svg.Services.GoodGame className={s.logo} />,
  };

  return (
    <Flex
      vertical
      className={s.card}
      justify="space-between"
      gap={4}
      onClick={onClick}
    >
      <Flex gap={4} align="center">
        {svgIcons[icon]}
        <Flex vertical gap={2}>
          <Flex gap={2}>
            <Assets.Svg.Icons.Eye className={s.icon} />
            <span>{guests || "~"}</span>
          </Flex>
          <Flex gap={2}>
            <Assets.Svg.Icons.Message className={s.icon} />
            <span>{users.length || "~"}</span>
          </Flex>
        </Flex>
      </Flex>
      <div className={s[status]} />
    </Flex>
  );
};
