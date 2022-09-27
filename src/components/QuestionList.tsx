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
            {type === "Connect Pairs Text Image" && <CPQuestionCard type="image"/>}
            {type === "Connect Pairs Text Text" && <CPQuestionCard type="text"/>}
          </Box>
        );
      })}
    </>
  );
}

export default QuestionList;