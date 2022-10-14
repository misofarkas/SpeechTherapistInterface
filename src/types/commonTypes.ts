import { NumberDecrementStepperProps } from "@chakra-ui/react";

export type Tag = {
  id: string;
  text: string;
};

export type BasicChoice = {
  id: string;
  text: string;
  image: string;
  tags: Tag[];
};

export type Question = {
  id: string;
  heading: string;
  choices: BasicChoice[];
};

export type GeneratedTask = {
  id: string;
  name: string;
  type: number;
  difficulty: string;
  created_by: string;
  questions: Question[];
};

export type Task = {
  id: string;
  name: string;
  type: number;
  difficulty: string;
  created_by: string;
  tags: Tag[];
};

export type TaskExtended = {
  id: string;
  name: string;
  type: number;
  difficulty: string;
  created_by: string;
  tags: Tag[];
  questions: Question[];
}

export type AnswerChoice = {
  data1: string;
  data2: string;
  is_correct: boolean;
};

export type Answer = {
  id: string;
  answer: AnswerChoice[];
};

export type TaskResult = {
  id: string;
  answered_by: string;
  task: string;
  answers: Answer[];
};

export type Patient = {
  id: string;
  email: string;
  name: string;
  is_therapist: boolean;
  assigned_tasks: Task[];
};
