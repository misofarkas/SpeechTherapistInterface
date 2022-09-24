import React from "react";
import { PatientExercisesData } from "../data/PatientExercisesData";
import ExerciseList from "./ExerciseList";

function PatientExercises({ patientId }) {
  const exercisesData = PatientExercisesData.filter(
    (e) => e.patientId === Number(patientId)
  );
  if (exercisesData.length === 0) {
    return <div>Patient has no exercises assigned</div>;
  }
  return (
    <ExerciseList exercisesData={exercisesData}/>
  );
}

export default PatientExercises;
