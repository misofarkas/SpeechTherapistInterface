import { Box } from "@chakra-ui/react";
import NIQuestionCard from "./CreateQuestionCards/NIQuestionCard";
import CPQuestionCard from "./CreateQuestionCards/CPQuestionCard";
import { CustomChoice, Question } from "../types/commonTypes";
import { isFourChoiceQuestion, isCustomQuestion } from "../types/typeGuards";
import { TaskType } from "../types/enums";

function QuestionList({
  questions,
  type,
  difficulty,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  questions: Question[];
  type: TaskType;
  difficulty: string;
  handleUpdateChoice?: ((a: string, b: string, c: string, d: number) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: CustomChoice[] | undefined;
}) {


  return (
    <>
      {questions.map((q) => {
        console.log("is custom", isCustomQuestion(q, type), isFourChoiceQuestion(q, type))
        return (
          <Box mb="5" key={q.id}>
            {type === TaskType.FourChoicesImage && isFourChoiceQuestion(q, type) && (
              <NIQuestionCard
                isEditable={difficulty === "Hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === TaskType.ConnectPairsTextImage && isCustomQuestion(q, type) && (
              <CPQuestionCard
                type={type}
                isEditable={difficulty === "Hard"}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === TaskType.ConnectPairsTextText && isCustomQuestion(q, type) && (
              <CPQuestionCard
                type={type}
                isEditable={difficulty === "Hard"}
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
