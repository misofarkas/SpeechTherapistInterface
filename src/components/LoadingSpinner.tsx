import { Center, Spinner, Text } from "@chakra-ui/react";

/**This component displays a loading spinner and
 * text to indicate that something is currently loading. */

function LoadingSpinner() {
  return (
    <Center mt="20%">
      <Spinner mr="10" size="xl" />
      <Text fontSize="24px">Loading ...</Text>
    </Center>
  );
}

export default LoadingSpinner;
