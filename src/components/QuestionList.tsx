import { Box } from "@chakra-ui/react";
import NIQuestionCard from "./CreateQuestionCards/NIQuestionCard";
import CPQuestionCard from "./CreateQuestionCards/CPQuestionCard"

type QuestionSettings = {
  questions: {
    id: number;
  }[];
  type: string;
};

function QuestionList({ questions, type }: QuestionSettings) {
  console.log(type)
  return (
    <>
      {questions.map((q) => {
        return (
          <Box mb="5" key={q.id}>
            {type === "Name Images" && <NIQuestionCard />}
            {type === "Connect Pairs" && <CPQuestionCard />}
          </Box>
        );
      })}
    </>
  );
}

export default QuestionList;
