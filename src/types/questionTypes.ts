import { Tag } from "./commonTypes";

// CHOICES
export type FourChoicesChoice = {
    id: string;
    question_data: string;
    correct_option: string;
    incorrect_option1: string;
    incorrect_option2: string;
    incorrect_option3: string;
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
  
  export type FourChoicesQuestion = {
    id: string;
    heading: string;
    choices: FourChoicesChoice[];
  };
  
  export type Question = FourChoicesQuestion | ConnectPairCustomQuestion;