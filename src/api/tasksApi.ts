import { Task, Question, TaskExtended, TaskResult, Tag } from "../types/commonTypes";
import axios from "./axios";

export async function getTasks({ auth }: { auth: any }) {
  return await axios.get<Task[]>("/task/tasks/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function getTask({ auth, id }: { auth: any; id: string }) {
  return await axios.get<TaskExtended>(`/task/tasks/${id}/`, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function postTask({
  auth,
  name,
  type,
  tags,
  questions,
}: {
  auth: any;
  name: string;
  type: number;
  tags: Tag[];
  questions: Question[];
}) {
  return await axios.post(
    "/task/custom_task/",
    { name, type, difficulty: "hard", tags, custom_questions: questions },
    { headers: { Authorization: `Token ${auth?.accessToken}` } }
  );
}

export async function patchTask({ auth, questions }: { auth: any; questions: Question[] }) {
  // TODO
}

export async function deleteTask({ auth, id }: { auth: any; id: string }) {
  return await axios.delete(`/task/tasks/${id}/`, { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function assignTask({ auth, patientId, taskId }: { auth: any; patientId: string; taskId: string }) {
  return await axios.patch(
    `/task/tasks/${taskId}/assign_task/`,
    { users: [patientId] },
    { headers: { Authorization: `Token ${auth?.accessToken}` } }
  );
}

export async function generateTask({
  auth,
  name,
  type,
  difficulty,
  selectedTags,
}: {
  auth: any;
  name: string;
  type: number;
  difficulty: string;
  selectedTags: string[];
}) {
  return await axios.post(
    "/task/tasks/",
    {
      name: name,
      type: type,
      difficulty: difficulty,
      tags: selectedTags.map((tag) => {
        return { name: tag };
      }),
    },
    { headers: { Authorization: `Token ${auth?.accessToken}` } }
  );
}

export async function getTaskResults({ auth }: { auth: any }) {
  return await axios.get<TaskResult[]>(`/task/results/`, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}

export async function getTaskResult({ auth, id }: { auth: any; id: string }) {
  return await axios.get<TaskResult>(`/task/results/${id}/`, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}
