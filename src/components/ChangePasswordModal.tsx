import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Text,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
import { updatePassword } from "../api/userProfileApi";
import { useAuth } from "../contexts/AuthContext";

// Modal component for handling password change used in user settings
function ChangePasswordModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, error: apiError, reset, mutate: updatePasswordMutation } = useMutation(updatePassword);
  const { auth } = useAuth();

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
    <>
      <Button
        onClick={() => {
          onOpen();
          reset();
        }}
        maxW="200px"
      >
        Change password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                setTimeout(() => {
                  updatePasswordMutation({
                    auth,
                    password: values.password,
                    confirm_password: values.confirmPassword,
                  });
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  {/** Field for password */}
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" {...field} placeholder="" />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/** Field for password confirmation*/}
                  <Field name="confirmPassword" validate={validateConfirmPassword}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="password" {...field} placeholder="" />
                        <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
                    Submit
                  </Button>
                  <Box mt="3">
                    <>{apiError && <Text>There has been an error</Text>}</>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
