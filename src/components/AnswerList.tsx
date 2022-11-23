import { Box } from "@chakra-ui/react";
import CPAnswerCard from "./AnswerQuestionCards/CPAnswerCard";
import { ConnectPairsAnswer, FourChoicesAnswer } from "../types/taskResultTypes";
import { TaskType } from "../types/enums";
import { isConnectPairsAnswer, isFourChoiceAnswer } from "../types/typeGuards";
import FCImageAnswerCard from "./AnswerQuestionCards/FCImageAnswerCard";
import FCTextAnswerCard from "./AnswerQuestionCards/FCTextAnswerCard";

function AnswerList({ answers, type }: { answers: ConnectPairsAnswer[] | FourChoicesAnswer[]; type: TaskType }) {
  return (
    <>
      {answers.map((a) => {
        return (
          <Box mb="5" key={a.id}>
            {type === TaskType.ConnectPairsTextImage && isConnectPairsAnswer(a, type as TaskType) && (
              <CPAnswerCard type={TaskType.ConnectPairsTextImage} answer={a} />
            )}
            {type === TaskType.ConnectPairsTextText && isConnectPairsAnswer(a, type as TaskType) && (
              <CPAnswerCard type={TaskType.ConnectPairsTextText} answer={a} />
            )}
            {type === TaskType.FourChoicesImage && isFourChoiceAnswer(a, type as TaskType) && (
              <FCImageAnswerCard type={TaskType.FourChoicesImage} answer={a.answer[0]} />
            )}
            {type === TaskType.FourChoicesText && isFourChoiceAnswer(a, type as TaskType) && (
              <FCTextAnswerCard type={TaskType.FourChoicesText} answer={a.answer[0]} />
            )}
          </Box>
        );
      })}
    </>
  );
}

export default AnswerList;
