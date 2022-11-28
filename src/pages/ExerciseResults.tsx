import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask, getTaskResult } from "../api/tasksApi";
import AnswerList from "../components/AnswerList";
import { useAuth } from "../contexts/AuthContext";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { isConnectPairsAnswers, isFourChoiceAnswers } from "../types/typeGuards";
import { TaskType } from "../types/enums";

function ExerciseResults() {
  const { id, taskId, type } = useParams();
  const { auth } = useAuth();
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const {
    isLoading: isLoadingResults,
    error,
    data: taskResultData,
  } = useQuery("taskResult", () => getTaskResult({ auth, id: id ?? "", taskType: type ?? "" }), {onSuccess: (res) => {
    let correct = 0
    let total = 0
    if (isConnectPairsAnswers(res.data.answers, type as TaskType)) {
      res.data.answers.map((ans) => ans.answer.map((choice) => (choice.is_correct ? correct++ : undefined)));
      res.data.answers.map((ans) => (total += ans.answer.length));
    }
    if (isFourChoiceAnswers(res.data.answers, type as TaskType)) {
      res.data.answers.map((ans) => ans.answer[0].is_correct ? correct++ : undefined);
      res.data.answers.map((ans) => (total += ans.answer.length));
    }
    setCorrect(correct);
    setTotal(total);
  }});
  const { isLoading, data: taskData } = useQuery("task", () => getTask({ auth, id: taskId ?? "", type: type ?? "" }), {
    enabled: !!taskResultData,
  });

  if (isLoading || isLoadingResults) {
    return <LoadingSpinner />;
  }

  if (taskResultData === undefined || taskData === undefined || error !== null) {
    return <Text>There has been an error</Text>;
  }
  return (
    <Container maxW="1000px">
      <Stack mb="2">
        <Heading>Task name: {taskData.data.name}</Heading>
        <Text>Total questions: {total}</Text>
        <Text>Correct questions: {correct}</Text>
        <Text>Success rate: {Math.floor((correct / total) * 100)}%</Text>
      </Stack>
      <AnswerList answers={taskResultData.data.answers} type={type as TaskType} />
    </Container>
  );
}

export default ExerciseResults;
