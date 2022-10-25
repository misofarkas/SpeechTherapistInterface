type ConnectPairAnswer = {
  id: string;
  text: string;
  imageUrl: string;
  isCorrect: boolean;
};

type ConnectPairsQuestion = {
  answers: ConnectPairAnswer[];
};

type NameImagesQuestion = {};

export type TaskResults = {
  id: string;
  patientId: string;
  taskId: string;
  taskName: string;
  taskType: string;
  taskDifficulty: string;
  taskTags: string[];
  questions: ConnectPairsQuestion[] | NameImagesQuestion[];
};

export const CompletedTasks: TaskResults[] = [
  {
    id: "0",
    patientId: "0",
    taskId: "0",
    taskName: "Speech basics",
    taskType: "Name Images",
    taskDifficulty: "Easy",
    taskTags: ["Fruits"],
    questions: [],
  },
];
