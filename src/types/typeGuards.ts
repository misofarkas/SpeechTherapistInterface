import { ConnectPairCustomQuestion, CustomChoice, FourChoicesChoice, FourChoicesQuestion, Question } from "./questionTypes";
import { TaskType } from "./enums";
import { ConnectPairsAnswer, FourChoicesAnswer } from "./taskResultTypes";

export function isFourChoiceQuestion(question: Question, type: TaskType): question is FourChoicesQuestion {
  return type === TaskType.FourChoicesImage || type === TaskType.FourChoicesText;
}

export function isCustomQuestion(question: Question, type: TaskType): question is ConnectPairCustomQuestion {
  return type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isFourChoiceQuestions(questions: Question[], type: TaskType): questions is FourChoicesQuestion[] {
  return questions.length === 0 || type === TaskType.FourChoicesImage || type === TaskType.FourChoicesText;
}

export function isCustomQuestions(questions: Question[], type: TaskType): questions is ConnectPairCustomQuestion[] {
  return questions.length === 0 || type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isFourChoiceChoice(choice: FourChoicesChoice | CustomChoice, type: TaskType): choice is FourChoicesChoice {
  return type === TaskType.FourChoicesImage || type === TaskType.FourChoicesText;
}

export function isCustomChoice(choice: FourChoicesChoice | CustomChoice, type: TaskType): choice is CustomChoice {
  return type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isConnectPairsAnswers(answer: ConnectPairsAnswer[] | FourChoicesAnswer[], type: TaskType): answer is ConnectPairsAnswer[] {
  return type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isFourChoiceAnswers(answer: ConnectPairsAnswer[] | FourChoicesAnswer[], type: TaskType): answer is FourChoicesAnswer[] {
  return type === TaskType.FourChoicesImage || type === TaskType.FourChoicesText;
}

export function isConnectPairsAnswer(answer: ConnectPairsAnswer | FourChoicesAnswer, type: TaskType): answer is ConnectPairsAnswer {
  return type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isFourChoiceAnswer(answer: ConnectPairsAnswer | FourChoicesAnswer, type: TaskType): answer is FourChoicesAnswer {
  return type === TaskType.FourChoicesImage || type === TaskType.FourChoicesText;
}