import { Box } from "@chakra-ui/react";
import NIQuestionCard from "./CreateQuestionCards/NIQuestionCard";
import CPQuestionCard from "./CreateQuestionCards/CPQuestionCard";
import { Question } from "../data/GeneratedCPExercise";


function QuestionList({ questions, type, difficulty }: {questions: Question[],type: number, difficulty: string}) {
  return (
    <>
      {questions.map((q) => {
        return (
          <Box mb="5" key={q.id}>
            {type === 2 && <NIQuestionCard isEditable={difficulty === "hard"} />}
            {type === 1 && <CPQuestionCard type="image" isEditable={difficulty === "hard"} choices={q.choices}/>}
            {type === 3 && <CPQuestionCard type="text" isEditable={difficulty === "hard"} choices={q.choices}/>}
          </Box>
        );
      })}
    </>
  );
}

export default QuestionList;
