import axios from "./axios";

async function getTasks({ auth, setError, id=undefined }: { auth: any; setError: (a: string) => void; id?: string }) {
  const GET_TASK_URL = id === undefined ? "/task/tasks/" : `/task/tasks/${id}/`;
  let result;
  console.log(GET_TASK_URL);
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
  console.log("getTasks result:", result?.data);
  return result?.data;
}

export default getTasks;
