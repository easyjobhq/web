import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = async (email: string, password: string) => {

    try {
      fetch("http://easy-job-eyze.onrender.com").then(response =>  {
        console.log(response);
      })
    } catch(error) {
      console.log(error);
    }

    const res = await this.instance
      .post("/auth/client/login", {
        email,
        password,
      });
    console.log("PLEASE HELPPP");
    console.log(res);
    
    return {
        username: "test",
        id: "test",
        accessToken: "test",
        expiredAt:  Date.now() + 60 * 60 * 24 * 7,
    }  
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };

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