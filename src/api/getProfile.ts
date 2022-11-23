import axios from "./axios";

export async function getProfile({ auth }: { auth: any }) {
  console.log("api auth", auth)
  return await axios.get("/user/therapist/myprofile/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}


