import { Link as RouterLink } from "react-router-dom";
import { Flex, LinkBox } from "@chakra-ui/react";
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
          <LinkBox
            as={RouterLink}
            key={exercise.id}
            to="#"
          >
            <ExerciseCard
              name={exercise.name}
              favs={exercise.favorited}
              type={exercise.type}
              difficulty={exercise.difficutly}
            />
          </LinkBox>
        );
      })}
    </Flex>
  );
}

export default ExerciseList;
