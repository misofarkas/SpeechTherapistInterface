import axios from "./axios";

async function getTaskResults({ auth, setError, id }: { auth: any; setError: (a: string) => void, id: string }) {
  const GET_TASKRESULT_URL = `/task/results/${id}`;
  let result;
  try {
    result = await axios.get(GET_TASKRESULT_URL, {
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

export default getTaskResults;
