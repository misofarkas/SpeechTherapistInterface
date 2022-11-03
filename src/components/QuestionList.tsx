import { Box } from "@chakra-ui/react";
import NIQuestionCard from "./CreateQuestionCards/NIQuestionCard";
import CPQuestionCard from "./CreateQuestionCards/CPQuestionCard";
import { CustomChoice, Question } from "../types/commonTypes";
import { isBasicQuestion, isCustomQuestion } from "../types/typeGuards";

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
  handleUpdateChoice?: ((a: string, b: string, c: string, d: boolean) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: CustomChoice[] | undefined;
}) {
  return (
    <>
      {questions.map((q) => {
        console.log(type, isCustomQuestion(q, type), q)
        return (
          <Box mb="5" key={q.id}>
            {type === 3 && isBasicQuestion(q, type) && (
              <NIQuestionCard
                isEditable={difficulty === "hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === 1 && isCustomQuestion(q, type) && (
              <CPQuestionCard
                type="image"
                isEditable={difficulty === "hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === 2 && isCustomQuestion(q, type) && (
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
