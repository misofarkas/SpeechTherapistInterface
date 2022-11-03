import { Question, BasicQuestion, ConnectPairCustomQuestion, BasicChoice, CustomChoice } from "./commonTypes";

/*
type 1 -> Connect Pairs text-image
type 2 -> Connect Pairs text-text
type 3 -> Name images
*/

export function isBasicQuestion(question: Question, type: number): question is BasicQuestion {
  return type === 3;
}

export function isCustomQuestion(question: Question, type: number): question is ConnectPairCustomQuestion {
  return type === 1 || type === 2;
}

export function isBasicQuestions(questions: Question[], type: number): questions is BasicQuestion[] {
  return questions.length === 0 || type === 3;
}

export function isCustomQuestions(questions: Question[], type: number): questions is ConnectPairCustomQuestion[] {
  return questions.length === 0 || type === 1 || type === 2;
}

export function isBasicChoice(choice: BasicChoice | CustomChoice, type: number): choice is BasicChoice {
  return type === 3;
}

export function isCustomChoice(choice: BasicChoice | CustomChoice, type: number): choice is CustomChoice {
  return type === 1 || type === 2
}
