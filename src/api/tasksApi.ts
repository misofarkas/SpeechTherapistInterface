import { Tag } from "../types/commonTypes";
import { Difficulties, TaskType } from "../types/enums";
import { Question } from "../types/questionTypes";
import { TaskResult, TaskResultExtended } from "../types/taskResultTypes";
import { Task, TaskExtended } from "../types/taskTypes";
import axios from "./axios";

export async function getTasks({ auth }: { auth: any }) {
  return await axios.get<Task[]>("/task/tasks/", { headers: { Authorization: `Token ${auth?.accessToken}` } });
}

export async function getTask({ auth, id, type }: { auth: any; id: string; type: string }) {
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
  return await axios.post(
    `/task/tasks/?task_type=${type}`,
    { name, type, difficulty: Difficulties.Hard, tags, questions: questions },
    { headers: { Authorization: `Token ${auth?.accessToken}` } }
  );
}

export async function patchTask({
  auth,
  id,
  name,
  type,
  tags,
  questions,
}: {
  auth: any;
  id: string;
  name: string;
  type: string;
  tags: Tag[];
  questions: Question[];
}) {
  return await axios.patch(
    `/task/tasks/${id}/`,
    { name, type, difficulty: Difficulties.Hard, tags, questions: questions },
    {
      headers: { Authorization: `Token ${auth?.accessToken}` },
    }
  );
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

export async function getTaskResult({ auth, id, taskType }: { auth: any; id: string; taskType: string }) {
  return await axios.get<TaskResultExtended>(`/task/results/${id}/?task_type=${taskType}`, {
    headers: { Authorization: `Token ${auth?.accessToken}` },
  });
}
