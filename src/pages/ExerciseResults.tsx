import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getTaskResults from "../api/getTaskResults";
import AnswerList from "../components/AnswerList";
import { useAuth } from "../contexts/AuthContext";
import { TaskResult } from "../types/commonTypes";

function ExerciseResults() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [exerciseResult, setExerciseResult] = useState<TaskResult>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      getTaskResults({ auth, setError, id }).then((value) => {
        setExerciseResult(value);
      });
    }
  }, []);

  return <>{exerciseResult !== undefined && <AnswerList answers={exerciseResult.answers} type={1} />}</>;
}

export default ExerciseResults;
