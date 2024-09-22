import { AuthService } from "./auth.service";
import { Check } from "./checkStatus.service";

export const authService = new AuthService(process.env.NEXT_PUBLIC_BACKEND_URL || "localhost:3001");

export const checkService = new Check(process.env.NEXT_PUBLIC_BACKEND_URL || "localhost:3001");
