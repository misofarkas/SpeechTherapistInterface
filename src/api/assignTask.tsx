import axios from "./axios";

async function assignTask({
  auth,
  setError,
  patientId,
  taskId,
}: {
  auth: any;
  setError: (a: string) => void;
  patientId: string;
  taskId: string;
}) {
  const ASSIGN_TASK_URL = `/task/tasks/${taskId}/assign_task/`;

  try {
    const response = await axios.patch(
      ASSIGN_TASK_URL,
      { users: [patientId] },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${auth?.accessToken}`,
        },
        withCredentials: false,
      }
    );
  } catch (err) {
    setError(String(err));
  }
}

export default assignTask;
