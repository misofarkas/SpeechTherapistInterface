import ExerciseResultCard from "./ExerciseResultCard";
import { LinkBox, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Task, TaskResult } from "../types/commonTypes";

function PatientExercises({
  assignedTasks,
  patientTaskResults,
}: {
  assignedTasks: Task[];
  patientTaskResults: TaskResult[];
}) {
  if (assignedTasks === undefined || assignedTasks.length === 0) {
    return <div>Patient has no exercises assigned</div>;
  }
  return (
    <>
      {assignedTasks.map((exercise) => {
        const taskResult = patientTaskResults.find((result)=> result.task === exercise.id)

        return (
          <Box mb="4" key={exercise.id}>
            <LinkBox as={RouterLink} to={taskResult ? `/ExerciseResults/${exercise.type}/${exercise.id}/${taskResult.id}` : "#"}>
              <ExerciseResultCard
                name={exercise.name}
                type={exercise.type}
                difficulty={exercise.difficulty}
                isFinished={!!taskResult}
              ></ExerciseResultCard>
            </LinkBox>
          </Box>
        );
      })}
    </>
  );
}

export default PatientExercises;
