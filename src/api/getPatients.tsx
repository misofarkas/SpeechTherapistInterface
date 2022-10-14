import axios from "./axios";

async function getPatients({
  auth,
  setError,
  id = undefined,
}: {
  auth: any;
  setError: (a: string) => void;
  id?: string;
}) {
  const GET_PATIENT_URL = id === undefined ? "/user/list/?patient_only=1" : `/user/list/${id}`;
  let result;
  try {
    result = await axios.get(GET_PATIENT_URL, {
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

export default getPatients;
