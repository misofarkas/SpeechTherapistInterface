import { Box } from "@chakra-ui/react";
import FCTextQuestionCard from "../CreateQuestionCards/FCTextQuestionCard";
import CPQuestionCard from "../CreateQuestionCards/CPQuestionCard";
import { CustomChoice, Question } from "../../types/questionTypes";
import { isFourChoiceQuestion, isCustomQuestion } from "../../types/typeGuards";
import { TaskType } from "../../types/enums";
import FCImageQuestionCard from "../CreateQuestionCards/FCImageQuestionCard";

/**Component used for deciding which Question card template to use
 * depending on the type of the task. */

function QuestionList({
  questions,
  type,
  isEditable,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  questions: Question[];
  type: TaskType;
  isEditable: boolean;
  handleUpdateChoice?: ((a: string, b: string, c: string, d: number) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: CustomChoice[] | undefined;
}) {
  return (
    <>
      {questions.map((q) => {
        console.log("type: ", type);
        return (
          <Box mb="5" key={q.id}>
            {type === TaskType.FourChoicesImage && isFourChoiceQuestion(q, type) && (
              <FCImageQuestionCard
                isEditable={isEditable}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === TaskType.FourChoicesText && isFourChoiceQuestion(q, type) && (
              <FCTextQuestionCard
                isEditable={isEditable}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === TaskType.ConnectPairsTextImage && isCustomQuestion(q, type) && (
              <CPQuestionCard
                type={type}
                isEditable={isEditable}
                question={q}
                handleUpdateChoice={handleUpdateChoice}
                handleDeleteQuestion={handleDeleteQuestion}
                imageData={imageData}
              />
            )}
            {type === TaskType.ConnectPairsTextText && isCustomQuestion(q, type) && (
              <CPQuestionCard
                type={type}
                isEditable={isEditable}
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
