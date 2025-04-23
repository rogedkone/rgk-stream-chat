import { EyeOutlined, MessageOutlined } from "@ant-design/icons";
import { Assets } from "@renderer/shared/assets";
import { Flex } from "antd";
import s from "./_service.module.scss";

export const Service = ({
  icon,
  guests,
  users,
  status = "offline",
  onClick,
}: {
  icon: "goodGame";
  guests: number | null;
  users: number | null;
  status: "online" | "offline" | "error" | "connecting";
  onClick: () => void;
}) => {
  const svgIcons = {
    goodGame: <Assets.Svg.Logo.GoodGame className={s.logo} />,
  };

  return (
    <Flex
      vertical
      className={s.service}
      justify="space-between"
      gap={4}
      onClick={onClick}
    >
      <Flex gap={4} align="center">
        {svgIcons[icon]}
        <Flex vertical gap={2}>
          <Flex gap={2}>
            <EyeOutlined className={s.icon} />
            <span>{guests || "~"}</span>
          </Flex>
          <Flex gap={2}>
            <MessageOutlined className={s.icon} />
            <span>{users || "~"}</span>
          </Flex>
        </Flex>
      </Flex>
      <div className={s[status]} />
    </Flex>
  );
};
