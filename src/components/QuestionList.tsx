import { Box } from "@chakra-ui/react";
import CIQuestionCard from "./CIQuestionCard";

type Questions = {
  questions: {
    id: number
  }[]
}

function QuestionList({ questions }: Questions) {
  return (
    <>
      {questions.map((q) => {
        return (
          <Box mb="5" key={q.id}>
            <CIQuestionCard/>
          </Box>
        );
      })}
    </>
  );
}

export default QuestionList;
