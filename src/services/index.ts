import { AuthService } from "./auth.service";
import { Check } from "./checkStatus.service";

export const authService = new AuthService("https://easy-job-eyze.onrender.com");

export const checkService = new Check("https://easy-job-eyze.onrender.com")

//export const authService = new AuthService("http://localhost:3001")