import { User } from "../types/commonTypes";
import axios from "./axios";

export async function updateProfile({ auth, profile }: { auth: any; profile: User }) {
    const test = profile;
    test.image="awd";
    console.log("image.", test.image, profile.image)
    //delete profile.image;
    return await axios.patch("/user/therapist/myprofile/", profile, { headers: { Authorization: `Token ${auth?.accessToken}` } });
  }

export async function updateAvatar({auth, avatar }: { auth: any; avatar: any}) {
    const data = new FormData();
    data.append("image", avatar);
    return await axios.patch("/user/therapist/myprofile/", data, { headers: { Authorization: `Token ${auth?.accessToken}` } });
}