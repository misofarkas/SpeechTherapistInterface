import { Box } from "@chakra-ui/react";
import CPAnswerCard from "./AnswerQuestionCards/CPAnswerCard";
import { Answer } from "../types/commonTypes";
import { TaskType } from "../types/enums";

function AnswerList({ answers, type }: { answers: Answer[]; type: number }) {
  return (
    <>
      {answers.map((a) => {
        return (
          <Box mb="5" key={a.id}>
            {type === 1 && <CPAnswerCard type={TaskType.ConnectPairsTextImage} answer={a} />}
            {type === 2 && <CPAnswerCard type={TaskType.ConnectPairsTextText} answer={a} />}
          </Box>
        );
      })}
    </>
  );
}

export default AnswerList;
