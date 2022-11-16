import { Question, FourChoicesQuestion, ConnectPairCustomQuestion, FourChoicesChoice, CustomChoice } from "./commonTypes";
import { TaskType } from "./enums";

/*
type 1 -> Connect Pairs text-image
type 2 -> Connect Pairs text-text
type 3 -> Name images
*/

export function isFourChoiceQuestion(question: Question, type: TaskType): question is FourChoicesQuestion {
  return type === TaskType.FourChoicesImage;
}

export function isCustomQuestion(question: Question, type: TaskType): question is ConnectPairCustomQuestion {
  return type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isFourChoiceQuestions(questions: Question[], type: TaskType): questions is FourChoicesQuestion[] {
  return questions.length === 0 || type === TaskType.FourChoicesImage;
}

export function isCustomQuestions(questions: Question[], type: TaskType): questions is ConnectPairCustomQuestion[] {
  return questions.length === 0 || type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}

export function isFourChoiceChoice(choice: FourChoicesChoice | CustomChoice, type: TaskType): choice is FourChoicesChoice {
  return type === TaskType.FourChoicesImage;
}

export function isCustomChoice(choice: FourChoicesChoice | CustomChoice, type: TaskType): choice is CustomChoice {
  return type === TaskType.ConnectPairsTextImage || type === TaskType.ConnectPairsTextText;
}
