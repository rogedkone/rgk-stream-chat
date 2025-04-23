import { Flex } from "antd";

import s from "./_message.module.scss";

export const User = ({
  id,
  text,
  user_name,
}: {
  id: number;
  text: string;
  user_name: string;
}) => {
  return (
    <Flex className={s.message}>
      <p>{`${user_name}:${text}`}</p>
    </Flex>
  );
};
