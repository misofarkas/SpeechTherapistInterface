import React from "react";
import { Input, Button, Text, Box, Heading, Container } from "@chakra-ui/react";

function SignUp() {
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
          Create account
        </Heading>
        <form>
          <Text>Full Name</Text>
          <Input mb="2"></Input>
          <Text>Email</Text>
          <Input mb="2"></Input>
          <Text>Password</Text>
          <Input type="password" mb="2"></Input>
          <Text>Confirm password</Text>
          <Input type="password" mb="10"></Input>
          <Button w="full">Sign Up</Button>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
