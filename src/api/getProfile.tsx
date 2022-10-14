import axios from "./axios";

async function getProfile({
  auth,
  setError,
}: {
  auth: any;
  setError: (a: string) => void;
}) {
  const GET_MYPROFILE_URL = "/user/myprofile/";
  let result;
  try {
    result = await axios.get(GET_MYPROFILE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth?.accessToken}`,
      },
      withCredentials: false,
    });
  } catch (err) {
    setError(String(err));
  }
  console.log(result?.data);
  return result?.data;
}

export default getProfile;
