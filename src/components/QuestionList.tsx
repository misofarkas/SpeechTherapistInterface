import { Box } from "@chakra-ui/react";
import NIQuestionCard from "./CreateQuestionCards/NIQuestionCard";
import CPQuestionCard from "./CreateQuestionCards/CPQuestionCard"

type QuestionSettings = {
  questions: {
    id: number;
  }[];
  type: string;
  difficulty: string;
};

function QuestionList({ questions, type, difficulty }: QuestionSettings) {
  return (
    <>
      {questions.map((q) => {
        return (
          <Box mb="5" key={q.id}>
            {type === "Name Images" && <NIQuestionCard isEditable={difficulty === "Hard"} />}
            {type === "Connect Pairs Text Image" && <CPQuestionCard type="image" isEditable={difficulty === "Hard"}/>}
            {type === "Connect Pairs Text Text" && <CPQuestionCard type="text" isEditable={difficulty === "Hard"}/>}
          </Box>
        );
      })}
    </>
  );
}

export default QuestionList;
