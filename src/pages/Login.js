import React from "react";
import { Link } from "react-router-dom";
import { Input, Button, Text, Box, Heading, Container } from "@chakra-ui/react";

function Login() {
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
          <Input mb="2"></Input>
          <Text>Password</Text>
          <Input type="password" mb="10"></Input>
          <Button w="full">Login</Button>
        </form>
      </Box>
      <Box textAlign="center">
        <p>Don't have an account yet?</p>
        <Link className="basic-link" to={"/SignUp"}>
          <p>Sign up here</p>
        </Link>
      </Box>
    </Container>
  );
}

export default Login;
