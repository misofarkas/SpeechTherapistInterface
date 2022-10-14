import axios from "./axios";

async function deleteTask({ auth, setError, id }: { auth: any; setError: (a: string) => void; id: string }) {
  const DELETE_TASK_URL = `/task/tasks/${id}/`;
  let result;
  try {
    result = await axios.delete(DELETE_TASK_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth?.accessToken}`,
      },
      withCredentials: false,
    });
  } catch (err) {
    setError(String(err));
  }
}

export default deleteTask;
