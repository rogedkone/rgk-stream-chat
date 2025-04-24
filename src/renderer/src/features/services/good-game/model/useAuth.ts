import { Api } from "@renderer/shared/api";
import { useMutation } from "@tanstack/react-query";
import { FormInstance } from "antd";

export const useAuth = <T>({
  service,
  onSuccess,
  onMutate,
  form,
}: {
  service: string;
  onSuccess: (data: T) => void;
  onMutate: () => void;
  form: FormInstance<{ login: string; password: string }>;
}) => {
  return useMutation({
    mutationKey: [`login/${service}`],
    mutationFn: () =>
      Api.goodGame.auth({
        login: form.getFieldValue("login"),
        password: form.getFieldValue("password"),
      }),
    onMutate,
    onSuccess,
  });
};
