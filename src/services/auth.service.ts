import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
      },
      
    });
  }

  login = async (email: string, password: string) => {

    const res = await this.instance
      .post("/auth/client/login", {
        email,
        password,
      });
    
    return res;
  };

  getMe = async (userId: string) => {
    const res = await this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      });
    return res.data;
  };

  getProfessinals = async () => {
    console.log(getAuthorizationHeader())
    const res = await this.instance
    .get('professionals/', {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  /*uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/users/${userId}/upload`, formData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };*/
}