import axios from "./axios";
import { User } from "../types/commonTypes";

export async function register({ registerInfo }: { registerInfo: User }) {
  return await axios.post("/user/therapist/register/", registerInfo);
}
