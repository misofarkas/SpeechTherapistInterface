import axios from "./axios";

async function getProfile({ auth, setError }: { auth: any; setError: (a: string) => void }) {
  const GET_MYPROFILE_URL = "/user/therapist/myprofile/";
  let result;
  try {
    result = await axios.get(GET_MYPROFILE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth?.accessToken}`,
      },
    });
  } catch (err) {
    setError(String(err));
  }
  console.log(result?.data);
  return result?.data;
}

export default getProfile;
/*
export async function getProfile({ auth }: { auth: any }) {
  return await axios.get("/user/therapist/myprofile/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}
*/

