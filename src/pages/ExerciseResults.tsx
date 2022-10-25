import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask, getTaskResult } from "../api/tasksApi";
import AnswerList from "../components/AnswerList";
import { useAuth } from "../contexts/AuthContext";
import { TaskExtended, TaskResult } from "../types/commonTypes";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";

function ExerciseResults() {
  const { id } = useParams();
  const { auth } = useAuth();
  //const [exerciseResult, setExerciseResult] = useState<TaskResult>();
  //const [task, setTask] = useState<TaskExtended>();
  //const [error, setError] = useState("");
  let correct = 0;
  let total = 0;
  //exerciseResult?.answers.map((ans) => ans.answer.map((choice) => (choice.is_correct ? correct++ : undefined)));
  //exerciseResult?.answers.map((ans) => (total += ans.answer.length));

  const { isLoading: isLoadingResults, error, data: taskResultData } = useQuery("taskResult", () => getTaskResult({ auth, id: id ?? "" }));
  const { isLoading, data: taskData } = useQuery("task", () => getTask({ auth, id: id ?? "" }), {
    enabled: !!taskResultData,
  });

  /*
  console.log(exerciseResult);
  useEffect(() => {
    if (id !== undefined) {
      getTaskResults({ auth, setError, id }).then((value) => {
        setExerciseResult(value);
        getTasks({ auth: auth, setError: setError, id: value?.task }).then((value) => {
          setTask(value);
        });
      });
    }
  }, []);
  */

  if (isLoading || isLoadingResults) {
    return <LoadingSpinner/>
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
      <AnswerList answers={taskResultData.data.answers} type={1} />
    </Container>
  );
}

export default ExerciseResults;
