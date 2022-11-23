
export type AnswerFourChoicesChoice = {
    id: string;
    question_data: string;
    correct_option: string;
    incorrect_option1: string;
    incorrect_option2: string;
    incorrect_option3: string;
  };
  
  export type AnswerConnectPairsChoice = {
    data1: string;
    data2: string;
    is_correct: boolean;
  };
  
  export type ConnectPairsAnswer = {
    id: string;
    answer: AnswerConnectPairsChoice[];
  };
  
  export type FourChoicesAnswer = {
    id: string;
    answer: AnswerFourChoicesChoice[];
  }
  export type TaskResult = {
    id: string;
    answered_by: string;
    task: string;
  };
  
  export type TaskResultExtended = {
    id: string;
    answered_by: string;
    task: string;
    answers: ConnectPairsAnswer[] | FourChoicesAnswer[];
  };