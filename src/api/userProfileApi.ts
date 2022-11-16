import { User } from "../types/commonTypes";
import axios from "./axios";

export async function updateProfile({ auth, profile }: { auth: any; profile: User }) {
  const { image, ...profileSettings } = profile;
  return await axios.patch("/user/therapist/myprofile/", profileSettings, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function updateAvatar({ auth, avatar }: { auth: any; avatar: any }) {
  const data = new FormData();
  data.append("image", avatar);
  return await axios.patch("/user/therapist/myprofile/", data, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function updatePassword({
  auth,
  password,
  confirm_password,
}: {
  auth: any;
  password: string;
  confirm_password: string;
}) {
  return await axios.patch(
    "/user/therapist/myprofile/",
    { password, confirm_password },
    { headers: { Authorization: `Token ${auth?.accessToken}` } }
  );
}
