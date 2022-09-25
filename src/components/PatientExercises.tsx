import { PatientExercisesData } from "../data/PatientExercisesData";
import ExerciseList from "./ExerciseList";

type patientId = {
  patientId: string
}

function PatientExercises({ patientId }: patientId) {
  const exercisesData = PatientExercisesData.filter(
    (e) => e.patientId === patientId
  );
  if (exercisesData.length === 0) {
    return <div>Patient has no exercises assigned</div>;
  }
  return (
    <ExerciseList exercisesData={exercisesData}/>
  );
}

export default PatientExercises;
