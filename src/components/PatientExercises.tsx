import { PatientExercisesData } from "../data/PatientExercisesData";
import ExerciseResultCard from "./ExerciseResultCard";
import { LinkBox, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type patientId = {
  patientId: string;
};

function PatientExercises({ patientId }: patientId) {
  const exercisesData = PatientExercisesData.filter((e) => e.patientId === patientId);
  if (exercisesData.length === 0) {
    return <div>Patient has no exercises assigned</div>;
  }
  return (
    <>
      {exercisesData.map((exercise) => {
        return (
          <Box mb="4">
            <LinkBox as={RouterLink} to={`/ExerciseResults/${exercise.id}`}>
              <ExerciseResultCard
                name={exercise.name}
                type={exercise.type}
                difficulty={exercise.difficutly}
              ></ExerciseResultCard>
            </LinkBox>
          </Box>
        );
      })}
    </>
  );
}

export default PatientExercises;
