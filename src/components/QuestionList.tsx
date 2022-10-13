import { Box } from "@chakra-ui/react";
import NIQuestionCard from "./CreateQuestionCards/NIQuestionCard";
import CPQuestionCard from "./CreateQuestionCards/CPQuestionCard";
import { BasicChoice, Question } from "../types/commonTypes";

function QuestionList({
  questions,
  type,
  difficulty,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  questions: Question[];
  type: number;
  difficulty: string;
  handleUpdateChoice?: ((a: string, b: string, c: string | undefined, d: string | undefined) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: BasicChoice[] | undefined;
}) {
  return (
    <>
      {questions.map((q) => {
        return (
          <Box mb="5" key={q.id}>
            {type === 3 && (
              <NIQuestionCard
                isEditable={difficulty === "hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === 1 && (
              <CPQuestionCard
                type="image"
                isEditable={difficulty === "hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === 2 && (
              <CPQuestionCard
                type="text"
                isEditable={difficulty === "hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={undefined}
              />
            )}
          </Box>
        );
      })}
    </>
  );
}

export default QuestionList;
