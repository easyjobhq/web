import { authService } from "../../services";
import Cookies from "js-cookie";

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const res = await authService.login(username, password);
    if (res) {
      Cookies.set("currentUser", JSON.stringify(res.data));
    }
    return res.data;
  };

  return { login };
};