import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Input, Button, Text, Box, Heading, Container, Link, useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

import { login } from "../api/login";
import { getProfile } from "../api/getProfile";
import { useMutation, useQuery } from "react-query";

function Login() {
  const { auth, setAuth, setUser } = useAuth();
  const [email, setEmail] = useState<string>("example@example.com");
  const [password, setPassword] = useState<string>("123456789");
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: loginMutation } = useMutation(login, {
    onSuccess: (res) => {
      setAuth({ accessToken: res.data.token });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There has been an error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const {} = useQuery("profile", () => getProfile({ auth }), {
    enabled: !!auth,
    onSuccess: (res) => {
      console.log("Success", res);
      setUser({ ...res.data });
      navigate(`/`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There has been an error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  function handleLogin(e: any) {
    e.preventDefault();
    loginMutation({ email, password });
  }

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
