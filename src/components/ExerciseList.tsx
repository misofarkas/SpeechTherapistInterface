import { Link as RouterLink } from "react-router-dom";
import { Flex, Link } from "@chakra-ui/react";
import ExerciseCard from "./ExerciseCard";
import { Exercise } from "../data/PatientExercisesData"

type ExerciseData = {
  exercisesData: Exercise[];
};

function ExerciseList({ exercisesData }: ExerciseData) {
  return (
    <Flex flexDirection="column" gap="2">
      {exercisesData.map((exercise) => {
        return (
          <Link
            as={RouterLink}
            key={exercise.id}
            to={"#"}
            style={{ textDecoration: "none" }}
          >
            <ExerciseCard
              name={exercise.name}
              favs={exercise.favorited}
              type={exercise.type}
              difficulty={exercise.difficutly}
            />
          </Link>
        );
      })}
    </Flex>
  );
}

export default ExerciseList;
