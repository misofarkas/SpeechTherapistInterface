import { Box, Text, Flex, Button, Fade } from "@chakra-ui/react";

/* A hovering prompt showing that the user has settings which are not saved.
 * handleSave function saves the current settings
 * handleReset function resets the current settings to saved settings. */
function SaveSettingsPrompt({
  handleSave,
  handleReset,
  isOpen,
}: {
  handleSave: () => void;
  handleReset: () => void;
  isOpen: boolean;
}) {
  return (
    <Fade in={isOpen}>
      <Box
        w="80%"
        maxW="800px"
        backgroundColor="gray.200"
        px="4"
        py="2"
        mx="auto"
        ml="2%"
        borderRadius="lg"
        position="fixed"
        bottom="25px"
      >
        <Flex justifyContent="space-between">
          <Text as="b" alignSelf="center">
            You have unsaved changes
          </Text>
          <Box>
            <Button onClick={handleReset} colorScheme="gray" mr="2">
              Reset
            </Button>
            <Button onClick={handleSave} colorScheme="green">
              Save Changes
            </Button>
          </Box>
        </Flex>
      </Box>
    </Fade>
  );
}

export default SaveSettingsPrompt;
