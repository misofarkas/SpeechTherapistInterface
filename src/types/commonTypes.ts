export type Auth = {
  email: string;
  password: string;
  accessToken: string;
};

export type Tag = {
  id: string;
  name: string;
  user: string;
};

// CHOICES

export type BasicChoice = {
  id: string;
  text: string;
  image: string;
  tags: Tag[];
};

export type CustomChoice = {
  id: string;
  data1: string;
  data2: string;
  tags: Tag[];
};

// QUESTIONS

export type ConnectPairCustomQuestion = {
  id: string;
  heading: string;
  choices: CustomChoice[];
};

export type BasicQuestion = {
  id: string;
  heading: string;
  choices: BasicChoice[];
};

export type Question = BasicQuestion | ConnectPairCustomQuestion;

// TASKS

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
};

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

export type Meeting = {
  id?: string;
  name: string;
  created_by: number;
  assigned_patient: string;
  start_time: string;
  end_time: string;
};

export type User = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  image?: string | null;
  phone?: string | null;
  location?: string | null;
  country?: string | null;
  company?: string | null;
  bio?: string | null;
};

export type LinkRequest = {
  id: string;
  email: string;
  name: string;
  image: string;
  assigned_to: number;
  assigment_active: boolean;
};

export type Event = {
  id: string;
  title: string;
  assignedPatient: string;
  start: Date;
  end: Date;
};

export type DateRange = {
  start: Date;
  end: Date;
};
