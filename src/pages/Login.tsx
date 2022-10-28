import { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Input, Button, Text, Box, Heading, Container, Link } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

import axios from "../api/axios";
import login from "../api/login";
import getProfile from "../api/getProfile";

function Login() {
  const LOGIN_URL = "/user/login/";
  const { auth, setAuth, setUser } = useAuth();
  const [email, setEmail] = useState<string>("example@example.com");
  const [password, setPassword] = useState<string>("123456789");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    login({ setError, email, password }).then((accessToken) => {
      setAuth({ accessToken });
    });
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    console.log("auth: ",auth)

    if (auth !== undefined) {
      getProfile({ auth, setError }).then((value) => {
        console.log("user value:", value)
        setUser({ ...value });
      });
    }
  }, [auth]);

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" maxW="400px" padding="5" m="auto" mb="5">
        <Heading size="md" textAlign="center" my="4">
          Therapist Login
        </Heading>
        <form>
          <Text>Email</Text>
          <Input mb="2" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
          <Text>Password</Text>
          <Input type="password" mb="10" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
          <Button w="full" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Box>
      <Box textAlign="center">
        <p>Don't have an account yet?</p>
        <Link as={RouterLink} to={"/SignUp"}>
          Sign up here
        </Link>
      </Box>
    </Container>
  );
}

export default Login;
