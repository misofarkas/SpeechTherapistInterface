import { Task, Question, TaskExtended, TaskResult, Tag } from "../types/commonTypes";
import { Difficulties, TaskType } from "../types/enums";
import axios from "./axios";

export async function getTasks({ auth }: { auth: any }) {
  return await axios.get<Task[]>("/task/tasks/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function getTask({ auth, id, type }: { auth: any; id: string, type: string }) {
  return await axios.get<TaskExtended>(`/task/tasks/${id}/?task_type=${type}`, {
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
  type: string;
  tags: Tag[];
  questions: Question[];
}) {
  console.log("postType:", type)
  return await axios.post(
    `/task/tasks/?task_type=${type}`,
    { name, type, difficulty: Difficulties.Hard, tags, questions: questions },
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
  type: TaskType;
  difficulty: string;
  selectedTags: string[];
}) {

  console.log("post type", type)
  return await axios.post(
    `/task/tasks/?task_type=${type}`,
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
