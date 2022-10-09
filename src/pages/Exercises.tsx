import {
  Container,
  Select,
  Flex,
  Input,
  Box,
  Link,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ExerciseList from "../components/ExerciseList";
import { PatientExercisesData, Exercise } from "../data/PatientExercisesData";

function Exercises() {
  const [filterNameValue, setFilterNameValue] = useState("");
  const [filterTypeValue, setFilterTypeValue] = useState("");
  const [filterDifficultyValue, setFilterDifficultyValue] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Filter data
  const filteredExercisesData = PatientExercisesData.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(filterNameValue.toLowerCase()) &&
      (filterTypeValue === "" || filterTypeValue === exercise.type) &&
      (filterDifficultyValue === "" ||
        filterDifficultyValue === exercise.difficutly)
  );

  // Sort data
  switch (sortBy) {
    case "fav-asc":
      filteredExercisesData.sort((a, b) =>
        a.favorited > b.favorited ? 1 : -1
      );
      break;
    case "fav-des":
      filteredExercisesData.sort((a, b) =>
        a.favorited < b.favorited ? 1 : -1
      );
      break;
    case "diff-asc":
      filteredExercisesData.sort((a, b) => compareDifficulties(a, b));
      break;
    case "diff-des":
      filteredExercisesData.sort((a, b) => -compareDifficulties(a, b));
      break;
    default:
      break;
  }

  function compareDifficulties(a: Exercise, b: Exercise) {
    if (
      a.difficutly === "Easy" &&
      (b.difficutly === "Medium" || b.difficutly === "Hard")
    ) {
      return -1;
    }
    if (a.difficutly === "Medium" && b.difficutly === "Hard") {
      return -1;
    }
    return 1;
  }

  return (
    <Container>
      <Box maxW="800px" mx="auto" mb="10">
        <Box mb="8">
          <Link as={RouterLink}  to="/CreateExercise">
            <Button w="full" mb="2">Create Custom Exercise</Button>
          </Link>
          <Link as={RouterLink} to="/CreateGeneratedExercise">
            <Button w="full">Generate New Exercise</Button>
          </Link>
        </Box>

        <Input
          value={filterNameValue}
          onChange={(e) => setFilterNameValue(e.target.value)}
          mb="2"
          maxW="49.5%"
          placeholder="Filter by name"
        />
        <Flex mb="2" gap="2">
          <Select
            value={filterTypeValue}
            onChange={(e) => setFilterTypeValue(e.target.value)}
            maxW="400px"
            placeholder="All types"
          >
            <option value="Connect Images">Connect Images</option>
            <option value="Name Images">Name Images</option>
          </Select>
          <Select
            value={filterDifficultyValue}
            onChange={(e) => setFilterDifficultyValue(e.target.value)}
            maxW="400px"
            placeholder="All difficulties"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>
        </Flex>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          maxW="200px"
          placeholder="Sort by"
        >
          <option value="fav-des">Favorites desc</option>
          <option value="fav-asc">Favorites asc</option>
          <option value="diff-des">Difficulty desc</option>
          <option value="diff-asc">Difficulty asc</option>
        </Select>
      </Box>
      <Box maxW="800px" mx="auto">
        <ExerciseList exercisesData={filteredExercisesData} />
      </Box>
    </Container>
  );
}

export default Exercises;
