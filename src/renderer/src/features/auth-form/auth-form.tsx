import { Assets } from "@renderer/shared/assets";
import { Button, Form, Input } from "antd";
import Flex from "antd/es/flex";
import { FormInstance } from "antd/es/form/Form";

import s from "./_auth-form.module.scss";

type TAuthForm<T> = {
  form: FormInstance<T>;
  service: string;
  isAuth: boolean;
  disabled: boolean;
  isLoading: boolean;
  onFinish: (values: T) => void;
};

export const AuthForm = <T,>({
  service,
  isAuth,
  disabled,
  isLoading,
  onFinish,
  form,
}: TAuthForm<T>) => {
  const serviceIcon = {
    goodgame: <Assets.Svg.Logo.GoodGame className={s.logo} />,
  };

  return (
    <Form
      form={form}
      disabled={disabled}
      onFinish={onFinish}
      initialValues={{
        login: window.localStorage.getItem(`${service}:login`) || "",
        password: window.localStorage.getItem(`${service}:password`) || "",
      }}
    >
      <Flex gap={12} align="center" vertical>
        <Flex align="center" justify="center">
          {serviceIcon[service]}
        </Flex>
        <Form.Item name="login" style={{ padding: 0, margin: 0, width: 200 }}>
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          style={{ padding: 0, margin: 0, width: 200 }}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={disabled}
        >
          Войти
        </Button>
        <Flex align="center" justify="center" gap={8}>
          <b>Токен:</b>
          {isAuth ? (
            <Assets.Svg.Icons.Check className={s.done} />
          ) : (
            <Assets.Svg.Icons.Cross className={s.undone} />
          )}
        </Flex>
      </Flex>
    </Form>
  );
};
