import axios from "./axios";

async function getTasks({ auth, setError }: { auth: any; setError: (a: string) => void }) {
  const GET_TASK_URL = "/task/tasks/";
  let result;
  try {
    result = await axios.get(GET_TASK_URL, {
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

export default getTasks;
