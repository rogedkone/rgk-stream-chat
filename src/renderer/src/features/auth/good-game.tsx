import { Assets } from "@renderer/shared/assets";
import { Button, Form, Input } from "antd";
import Flex from "antd/es/flex";
import { useForm } from "antd/es/form/Form";

import s from "./_auth.module.scss";
import { useMutation } from "@tanstack/react-query";

import { Api } from "@renderer/shared/api";
import { CheckCircleFilled } from "@ant-design/icons";
import { useGlobalStores } from "@renderer/store";
import { MessageInstance } from "antd/es/message/interface";
import { observer } from "mobx-react-lite";

export const GoodGame = observer(({ msg }: { msg: MessageInstance }) => {
  const { goodGameStore } = useGlobalStores();
  const { isAuth } = goodGameStore;
  const [form] = useForm();
  const { mutate: tryLogin, isPending } = useMutation({
    mutationKey: ["login", "goodgame"],
    mutationFn: () =>
      Api.goodGame.auth({
        login: form.getFieldValue("login"),
        password: form.getFieldValue("password"),
      }),
    onMutate: () => {
      goodGameStore.setField("isAuth", false);
    },
    onSuccess: ({ token, result, response }) => {
      if (!result) {
        msg.error(response);
        goodGameStore.setField("isAuth", false);
      } else {
        window.localStorage.setItem("goodgame:token", token);
        goodGameStore.setField("token", token);
        window.localStorage.setItem(
          "goodgame:login",
          form.getFieldValue("login")
        );
        window.localStorage.setItem(
          "goodgame:password",
          form.getFieldValue("password")
        );
        msg.success(response);
        goodGameStore.setField("isAuth", true);
      }
    },
  });

  return (
    <Form
      form={form}
      onFinish={tryLogin}
      initialValues={{
        login: window.localStorage.getItem("goodgame:login") || "",
        password: window.localStorage.getItem("goodgame:password") || "",
      }}
    >
      <Flex gap={12} align="center">
        <Assets.Svg.Logo.GoodGame className={s.logo} />
        <Form.Item name="login" style={{ padding: 0, margin: 0 }}>
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item name="password" style={{ padding: 0, margin: 0 }}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Войти
        </Button>
        <CheckCircleFilled className={isAuth ? s.done : s.grey} />
      </Flex>
    </Form>
  );
});
