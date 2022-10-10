import { Question } from "../data/GeneratedCPExercise";
import axios from "./axios";

async function postTask({
  questions,
  auth,
  postError,
  setPostError,
}: {
  questions: Question[];
  auth: any;
  postError: string;
  setPostError: (a: string) => void;
}) {
  const POST_TASK_URL = "/task/tasks/";
  let isValid = true;

  console.log(questions);
  questions.forEach((question) => {
    question.choices.forEach((choice) => {
      if (choice.text === "" && choice.image === "") {
        setPostError("Not all questions are fully filled out")
        isValid = false;
      }
    });
  });

  if (isValid) {
    try {
      axios.post(
        POST_TASK_URL,
        { name: "test1", type: 1, tags: [], questions: questions },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${auth?.accessToken}`,
          },
          withCredentials: false,
        }
      );
    } catch (err) {
      setPostError(String(err));
    }
  }
}

export default postTask;
