import { Container, Select, Flex, Input, Box, Link, Button, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
//import getTasks from "../api/getTasks";
import ExerciseList from "../components/ExerciseList";
import { useAuth } from "../contexts/AuthContext";
import { PatientExercisesData, Exercise } from "../data/PatientExercisesData";
import { Task } from "../types/commonTypes";
import { getTasks } from "../api/tasksApi";
import { useQuery } from "react-query";

function Exercises() {
  const [filterNameValue, setFilterNameValue] = useState("");
  const [filterTypeValue, setFilterTypeValue] = useState<number>(0);
  const [filterDifficultyValue, setFilterDifficultyValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [createdByUser, setCreatedByUser] = useState(false);
  const { auth, userId } = useAuth();

  const { isLoading, isSuccess, error, data: taskData } = useQuery("tasks", () => getTasks({ auth }));

  console.log("loading...:", isLoading);
  console.log("API error:", error);

  // Filter data
  let filteredTaskData: Task[] = [];
  if (isSuccess) {
    filteredTaskData = taskData.data.filter(
      (task) =>
        task.name.toLowerCase().includes(filterNameValue.toLowerCase()) &&
        (filterTypeValue === 0 || filterTypeValue === task.type) &&
        (filterDifficultyValue === "" || filterDifficultyValue === task.difficulty) &&
        (!createdByUser || userId.id === task.created_by)
    );
  }

  /*
  // Sort data
  switch (sortBy) {
    case "fav-asc":
      filteredTaskData.sort((a, b) => (a.favorited > b.favorited ? 1 : -1));
      break;
    case "fav-des":
      filteredTaskData.sort((a, b) => (a.favorited < b.favorited ? 1 : -1));
      break;
    case "diff-asc":
      filteredTaskData.sort((a, b) => compareDifficulties(a, b));
      break;
    case "diff-des":
      filteredTaskData.sort((a, b) => -compareDifficulties(a, b));
      break;
    default:
      break;
  }
  
  function compareDifficulties(a: Exercise, b: Exercise) {
    if (a.difficutly === "Easy" && (b.difficutly === "Medium" || b.difficutly === "Hard")) {
      return -1;
    }
    if (a.difficutly === "Medium" && b.difficutly === "Hard") {
      return -1;
    }
    return 1;
  }
  */

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
            onChange={(e) => setFilterTypeValue(Number(e.target.value))}
            maxW="400px"
            placeholder="All types"
          >
            <option value={1}>Connect Images</option>
            <option value={2}>Connect Text</option>
            <option value={3}>Name Images</option>
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
          <option value="fav-des">Favorites desc</option>
          <option value="fav-asc">Favorites asc</option>
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
