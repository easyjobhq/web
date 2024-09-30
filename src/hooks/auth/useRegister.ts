import { authService } from "../../services";
import Cookies from "js-cookie";

export const useRegister = () => {
  const register = async (name:string, last_name:string, email:string, phone_number:string, password:string, photo:File, serviceId:string, languageId:string, cityId:string, specialityId:string,  selectedOption:string) => {
    const user = await authService.register(name, last_name, email, phone_number, password, photo, serviceId,languageId,cityId,specialityId, selectedOption);
    if (user) {
      Cookies.remove("currentUser")
    }
    return user;
  };

  return { register };
};