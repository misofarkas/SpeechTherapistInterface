import { Center, Spinner, Text } from "@chakra-ui/react";

function LoadingSpinner() {
  return (
    <Center mt="20%">
      <Spinner mr="10" size="xl" />
      <Text fontSize="24px">Loading ...</Text>
    </Center>
  );
}

export default LoadingSpinner;
