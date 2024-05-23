import { authService } from "../../services";
import Cookies from "js-cookie";

export const useRegister = () => {
  const register = async (name:string, last_name:string, email:string, phone_number:string, password:string, selectedOption: string) => {
    const user = await authService.register(name, last_name, email, phone_number, password, selectedOption);
    console.log(" Este es el usuario AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + user)
    return user;
  };

  return { register };
};