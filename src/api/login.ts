import { Auth } from "../types/commonTypes";
import axios from "./axios";

export async function login({email, password}: {email: string, password: string}) {
  return await axios.post<{token: string}>("/user/login/", { email: email, password: password })
}
