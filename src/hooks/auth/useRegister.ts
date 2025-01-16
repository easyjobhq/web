import { authService } from "../../services";
import Cookies from "js-cookie";

export const useRegister = () => {
  const register = async (name:string, last_name:string, email:string, phone_number:string, password:string, photo:File | null, serviceId:string, languageId:string, cityId:string, specialityId:string, latitud: number , longitud:number,  selectedOption:string) => {
    console.log("useRegister", phone_number)
    const user = await authService.register(name, last_name, email, phone_number, password, photo, serviceId,languageId,cityId,specialityId, latitud, longitud, selectedOption);
    if (user) {
      Cookies.remove("currentUser")
    }
    return user;
  };

  return { register };
};