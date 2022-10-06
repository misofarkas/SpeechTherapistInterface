import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Input, Button, Text, Box, Heading, Container, Link } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

import axios from "../api/axios";

function Login() {
  const LOGIN_URL = "/user/login/";
  const { setAuth } = useAuth();
  const [email, setEmail] = useState<string>("example@example.com");
  const [password, setPassword] = useState<string>("123456789");

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      const accessToken = response?.data?.token;
      console.log(accessToken);
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("API Error");
    }
  }

  return (
    <Container>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        maxW="400px"
        padding="5"
        m="auto"
        mb="5"
      >
        <Heading size="md" textAlign="center" my="4">
          Therapist Login
        </Heading>
        <form>
          <Text>Email</Text>
          <Input
            mb="2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Text>Password</Text>
          <Input
            type="password"
            mb="10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button w="full" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Box>
      <Box textAlign="center">
        <p>Don't have an account yet?</p>
        <Link as={RouterLink}  to={"/SignUp"}>
          Sign up here
        </Link>
      </Box>
    </Container>
  );
}

export default Login;
