import { authService } from "../../services";
import Cookies from "js-cookie";

export const useRegister = () => {
  const register = async (name:string, last_name:string, email:string, phone_number:string, password:string, photo_url:string, serviceId:string, languageId:string, cityId:string, specialityId:string,  selectedOption:string) => {
    //console.log("este es el serviceId " + serviceId + '\n este es el language_id ' + languageId + "\n este es el city_id" + cityId + "\n este es el speciality_id " + specialityId);
    const user = await authService.register(name, last_name, email, phone_number, password, photo_url, serviceId,languageId,cityId,specialityId, selectedOption);
    console.log(" Este es el usuario AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + user)
    return user;
  };

  return { register };
};