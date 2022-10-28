import {
  Input,
  Button,
  Text,
  Box,
  Heading,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, useFormik, Form, FieldInputProps } from "formik";
import { useMutation } from "react-query";
import axios from "../api/axios";
import { register } from "../api/register";

function SignUp() {
  const { isLoading, isError, error, mutate: registerMutation } = useMutation(register);
  const SIGNUP_URL = "/user/therapist/register/";

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length < 3) {
      error = "Name needs to be at least 3 characters long";
    } else if (value.length > 30) {
      error = "Name too long";
    }
    return error;
  }

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!value.includes("@")) {
      error = "Email is invalid";
    }
    return error;
  }

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password needs to be at least 8 characters long";
    }
    return error;
  }

  function validateConfirmPassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password needs to be at least 8 characters long";
    }
    return error;
  }

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" maxW="400px" padding="5" m="auto" mb="5">
        <Heading size="md" textAlign="center" my="4">
          Create account
        </Heading>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              registerMutation({
                registerInfo: {
                  email: values.email,
                  name: values.fullName,
                  password: values.password,
                  confirm_password: values.confirmPassword,
                },
              });
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="fullName" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.fullName && form.touched.fullName}>
                    <FormLabel>Full name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validateEmail}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validatePassword}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} placeholder="" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword" validate={validateConfirmPassword}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...field} placeholder="" />
                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                Submit
              </Button>
              <Box>
                <>{error && <Text>There has been an error</Text>}</>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default SignUp;
