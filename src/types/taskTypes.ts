// TASKS
import { TaskType } from "./enums";
import { Question } from "./questionTypes";
import { Tag } from "./commonTypes";
import { FourChoicesQuestion, ConnectPairCustomQuestion } from "./questionTypes";

export type GeneratedTask = {
    id: string;
    name: string;
    type: TaskType;
    difficulty: string;
    created_by: string;
    questions: Question[];
  };
  
  export type Task = {
    id: string;
    name: string;
    type: TaskType;
    difficulty: string;
    created_by: string;
    tags: Tag[];
  };
  
  export type TaskExtended = {
    id: string;
    name: string;
    type: TaskType;
    difficulty: string;
    created_by: string;
    tags: Tag[];
    questions: FourChoicesQuestion[] | ConnectPairCustomQuestion[];
  };