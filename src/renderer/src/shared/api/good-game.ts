import axios from "axios";
import { API_LINKS } from "../consts";

const client = axios.create({
  baseURL: API_LINKS.GoodGame,
});

const auth = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("login", login);
  formData.append("password", password);
  const { data } = await client.post("/chatlogin", formData);
  return data;
};

export const goodGame = {
  auth,
};
