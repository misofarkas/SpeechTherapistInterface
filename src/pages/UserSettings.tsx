import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Container,
  Box,
  FormHelperText,
  FormControl,
  Input,
  Avatar,
  Text,
  Flex,
  Stack,
  Divider,
  Button,
  Textarea,
  useMediaQuery,
  Code,
} from "@chakra-ui/react";

function UserSettings() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  console.log(isLargerThan768 ? "row" : "column");

  return (
    <Container maxW="1200px">
      <Heading mb="5">User settings</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>General Settings</Tab>
          <Tab>Privacy</Tab>
          <Tab>...</Tab>
        </TabList>

        <TabPanels>
          {/* General Settings */}
          <TabPanel>
            <Stack spacing="5" mx="-4">
              <Box borderWidth="1px" borderRadius="lg" padding="5">
                <Stack spacing="4">
                  <Flex gap="4" direction={isLargerThan768 ? "row" : "column"}>
                    <Heading size="sm" alignSelf={isLargerThan768 ? "center" : ""}>
                      Full Name
                    </Heading>
                    <Input maxW="400px"></Input>
                  </Flex>
                  <Divider />
                  <Flex gap="4">
                    <Heading size="sm" alignSelf="center">
                      Change Avatar
                    </Heading>
                    <Avatar />
                  </Flex>
                  <Divider />
                  <Box>
                    <Heading size="sm" mb="2">
                      About (optional)
                    </Heading>
                    <Text size="sm" color="gray.600">
                      Tell us a little about yourself
                    </Text>
                    <Textarea />
                  </Box>
                </Stack>
              </Box>

              <Box borderWidth="1px" borderRadius="lg" padding="5">
                <Stack spacing="5">
                  <Heading>Contact Information</Heading>
                  <FormControl>
                    <Stack spacing="5">
                      <Divider />
                      <Box>
                        <Heading size="sm">Email</Heading>
                        <Flex gap="4">
                          <Text fontSize="sm" alignSelf="center">
                            some_email@gmail.com
                          </Text>
                          <Button size="sm">Change Email</Button>
                        </Flex>
                        <FormHelperText>You can change your email only once per week.</FormHelperText>
                      </Box>
                      <Divider />
                      <Box>
                        <Flex gap="4">
                          <Heading size="sm" alignSelf="center">
                            Phone number
                          </Heading>
                          <Input maxW="400px"></Input>
                        </Flex>
                      </Box>
                    </Stack>
                  </FormControl>
                </Stack>
              </Box>

              <Box borderWidth="1px" borderRadius="lg" padding="5">
                <Stack spacing="5">
                  <Heading>Link</Heading>
                  <Stack spacing="5">
                    <Divider />
                    <Box>
                      <Text size="sm" color="gray.600">
                        Generate a new invite link for your patients
                      </Text>
                      <Flex gap="4">
                        <Code fontSize="sm" alignSelf="center">
                          fs45cSw2dA32s4
                        </Code>
                        <Button size="sm">Generate New Link</Button>
                      </Flex>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </TabPanel>
          {/* Privacy */}
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          {/* ... */}
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default UserSettings;
