import { Entities } from "@renderer/entities";

import { useState } from "react";
import { Flex, Modal } from "antd";
import { Features } from "@renderer/features";
import { MessageInstance } from "antd/es/message/interface";
import { useForm } from "antd/es/form/Form";
import { useAuth } from "../model";
import { SocketClient } from "./socket-client";
import { observer } from "mobx-react-lite";
import { ServiceStore } from "@renderer/store";

export const GoodGame = observer(({ msg }: { msg: MessageInstance }) => {
  const [store] = useState(new ServiceStore("goodgame"));

  const { guests, users, status, isOpen, isAuth, service, token } = store;
  const [form] = useForm();

  const { mutate: tryLogin, isPending } = useAuth<{
    token: string;
    result: boolean;
    response: string;
  }>({
    service,
    form,
    onSuccess: ({ token, result, response }) => {
      const isError = !result;

      if (isError) {
        msg.error(response);
      }

      if (!isError) {
        window.localStorage.setItem(`${service}:token`, token);
        window.localStorage.setItem(
          `${service}:login`,
          form.getFieldValue("login")
        );
        window.localStorage.setItem(
          `${service}:password`,
          form.getFieldValue("password")
        );
        msg.success(`${service} успешный вход`);
        store.setField("token", token);
        store.setField("isAuth", true);
      }
    },
    onMutate: () => {
      store.setField("isAuth", false);
      store.setField("token", null);
      setTimeout(() => {
        store.setField("status", "connecting");
      }, 1000);
    },
  });

  return (
    <>
      {token && <SocketClient token={token} store={store} />}
      <Modal
        title="GoodGame авторизация"
        open={isOpen}
        onCancel={() => store.setField("isOpen", false)}
        footer={[]}
      >
        <Features.AuthForm
          service="goodgame"
          form={form}
          isAuth={isAuth}
          disabled={false}
          isLoading={isPending}
          onFinish={tryLogin}
        />
        {users.length > 0 && (
          <Flex vertical>
            <Flex align="center" justify="center">
              <b>В чате сейчас</b>
            </Flex>
            <div key="1">
              {users.map(({ username }) => username).join(", ")}
            </div>
          </Flex>
        )}
      </Modal>
      <Entities.Service.Card
        icon="goodgame"
        guests={guests}
        users={users}
        status={status}
        onClick={() => store.setField("isOpen", true)}
      />
    </>
  );
});
