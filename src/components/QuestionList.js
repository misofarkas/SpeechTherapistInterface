import React from "react";
import { Box } from "@chakra-ui/react";
import CIQuestionCard from "./CIQuestionCard";

function QuestionList({ questions }) {
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
