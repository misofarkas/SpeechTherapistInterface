import { PatientExercisesData } from "../data/PatientExercisesData";
import ExerciseResultCard from "./ExerciseResultCard";
import { LinkBox, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Task } from "../types/commonTypes";

function PatientExercises({ assignedTasks }: { assignedTasks: Task[] }) {
  if (assignedTasks === undefined || assignedTasks.length === 0) {
    return <div>Patient has no exercises assigned</div>;
  }
  return (
    <>
      {assignedTasks.map((exercise) => {
        return (
          <Box mb="4">
            <LinkBox as={RouterLink} to={`/ExerciseResults/${exercise.type}/${exercise.id}`}>
              <ExerciseResultCard
                name={exercise.name}
                type={exercise.type}
                difficulty={exercise.difficulty}
              ></ExerciseResultCard>
            </LinkBox>
          </Box>
        );
      })}
    </>
  );
}

export default PatientExercises;
