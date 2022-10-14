import axios from "./axios";

async function login({
  setError,
  email,
  password,
}: {
  setError: (a: string) => void;
  email: string;
  password: string;
}) {
  const LOGIN_URL = "/user/login/";
  let result;
  try {
    result = await axios.post(
      LOGIN_URL,
      { email: email, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
  } catch (err) {
    setError(String(err));
  }

  return result?.data?.token;
}

export default login;
