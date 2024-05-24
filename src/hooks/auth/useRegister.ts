import { authService } from "../../services";
import Cookies from "js-cookie";

export const useRegister = () => {
  const register = async (name:string, last_name:string, email:string, phone_number:string, password:string, photo_url:string, selectedOption: string) => {
    console.log(photo_url)
    const user = await authService.register(name, last_name, email, phone_number, password, photo_url, selectedOption);
    console.log(" Este es el usuario AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + user)
    return user;
  };

  return { register };
};