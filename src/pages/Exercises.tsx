import { Container, Select, Flex, Input, Box, Link, Button, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
//import getTasks from "../api/getTasks";
import ExerciseList from "../components/exerciseComponents/ExerciseList";
import { useAuth } from "../contexts/AuthContext";
import { Task } from "../types/taskTypes";
import { getTasks } from "../api/tasksApi";
import { useQuery } from "react-query";
import { TaskType } from "../types/enums";

function Exercises() {
  const [filterNameValue, setFilterNameValue] = useState("");
  const [filterTypeValue, setFilterTypeValue] = useState<TaskType | undefined>(undefined);
  const [filterDifficultyValue, setFilterDifficultyValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [createdByUser, setCreatedByUser] = useState(false);
  const { auth, user } = useAuth();

  const { isLoading, isSuccess, error, data: taskResponse } = useQuery("tasks", () => getTasks({ auth }));

  // Filter data
  let filteredTaskData: Task[] = [];
  if (isSuccess) {
    filteredTaskData = taskResponse.data.filter(
      (task) =>
        task.name.toLowerCase().includes(filterNameValue.toLowerCase()) &&
        (filterTypeValue === undefined || filterTypeValue === task.type) &&
        (filterDifficultyValue === "" || filterDifficultyValue === task.difficulty) &&
        (!createdByUser || user.id === task.created_by)
    );
  }

  // Sort data
  switch (sortBy) {
    case "diff-asc":
      filteredTaskData.sort((a, b) => compareDifficulties(a, b));
      break;
    case "diff-des":
      filteredTaskData.sort((a, b) => -compareDifficulties(a, b));
      break;
    case "name-asc":
      filteredTaskData.sort((a, b) => {return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1});
      break;
    case "name-des":
      filteredTaskData.sort((a, b) => {return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1});
      break;
    default:
      break;
  }

  function compareDifficulties(a: Task, b: Task) {
    if (a.difficulty === "Easy" && (b.difficulty === "Medium" || b.difficulty === "Hard")) {
      return -1;
    }
    if (a.difficulty === "Medium" && b.difficulty === "Hard") {
      return -1;
    }
    return 1;
  }

  return (
    <Container>
      <Box maxW="800px" mx="auto" mb="10">
        <Box mb="8">
          <Link as={RouterLink} to="/CreateExercise">
            <Button w="full" mb="2">
              Create Custom Exercise
            </Button>
          </Link>
          <Link as={RouterLink} to="/CreateGeneratedExercise">
            <Button w="full">Generate New Exercise</Button>
          </Link>
        </Box>

        <Flex gap="3">
          <Input
            value={filterNameValue}
            onChange={(e) => setFilterNameValue(e.target.value)}
            mb="2"
            maxW="49.5%"
            placeholder="Filter by name"
          />
          <Text>My exercises</Text>
          <Switch mt="1" isChecked={createdByUser} onChange={(e) => setCreatedByUser(e.target.checked)} />
        </Flex>
        <Flex mb="2" gap="3">
          <Select
            value={filterTypeValue}
            onChange={(e) => setFilterTypeValue(e.target.value as TaskType)}
            maxW="400px"
            placeholder="All types"
          >
            <option value={TaskType.ConnectPairsTextImage}>Connect Images</option>
            <option value={TaskType.ConnectPairsTextText}>Connect Text</option>
            <option value={TaskType.FourChoicesImage}>Name Images</option>
          </Select>
          <Select
            value={filterDifficultyValue}
            onChange={(e) => setFilterDifficultyValue(e.target.value)}
            maxW="400px"
            placeholder="All difficulties"
          >
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
          </Select>
        </Flex>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} maxW="200px" placeholder="Sort by">
          <option value="name-des">Name desc</option>
          <option value="name-asc">Name asc</option>
          <option value="diff-des">Difficulty desc</option>
          <option value="diff-asc">Difficulty asc</option>
        </Select>
      </Box>
      <Box maxW="800px" mx="auto">
        {error !== null ? <>{error}</> : <ExerciseList taskData={filteredTaskData} />}
      </Box>
    </Container>
  );
}

export default Exercises;
