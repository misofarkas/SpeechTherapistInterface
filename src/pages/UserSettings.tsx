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
import { useState } from "react";
import { useMutation } from "react-query";
import { updateAvatar, updateProfile } from "../api/userProfileApi";
import SaveSettingsPrompt from "../components/SaveSettingsPrompt";
import UploadImage from "../components/UploadImage";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/commonTypes";

function UserSettings() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { auth, user, setUser } = useAuth();
  const [currentSettings, setCurrentSettings] = useState<User>(user);
  const [newAvatar, setNewAvatar] = useState("");
  const [newAvatarPreview, setNewAvatarPreview] = useState<string | null>(user.image);
  const settingsHaveChanged = JSON.stringify(user) !== JSON.stringify(currentSettings);

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      console.log("profile Updated");
      setUser(currentSettings);
    },
  });

  const updateAvatarMutation = useMutation(updateAvatar);

  
  console.log("currentSettigns", currentSettings);
  console.log("user", user);
  
  console.log("user === currentSettings", JSON.stringify(user) === JSON.stringify(currentSettings));
  /*
  console.log("newAvatar", newAvatar);
  console.log("newAvatarPreview", newAvatarPreview);
  */
  function handleSave() {
    updateProfileMutation.mutate({ auth, profile: currentSettings });
  }

  function resetSettings() {
    setCurrentSettings(user);
    setNewAvatar("");
    setNewAvatarPreview(user.image);
  }

  function handleAvatarChange(e: any) {
    const file = e.target.files[0];
    setNewAvatar(file);
    setNewAvatarPreview(URL.createObjectURL(file));
  }

  function handleAvatarUpload() {
    const res = updateAvatarMutation.mutateAsync({
      auth,
      avatar: newAvatar,
    });
    res.then((value) => {
      setUser(value.data);
      setCurrentSettings({ ...currentSettings, image: value.data.image });
    });
  }

  return (
    <Container maxW="1200px" pb="5rem">
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
            {/*Main settings*/}
            <Stack spacing="5" mx="-4">
              <Box borderWidth="1px" borderRadius="lg" padding="5">
                <Stack spacing="4">
                  <Flex gap="4" direction={isLargerThan768 ? "row" : "column"}>
                    <Heading size="sm" alignSelf={isLargerThan768 ? "center" : ""}>
                      Full Name
                    </Heading>
                    <Input
                      value={currentSettings.name}
                      maxW="400px"
                      onChange={(e) => setCurrentSettings({ ...currentSettings, name: e.target.value })}
                    ></Input>
                  </Flex>
                  <Divider />
                  <Flex gap="4">
                    <Heading size="sm" alignSelf="center">
                      Change Avatar
                    </Heading>
                    <UploadImage handleImageSelection={handleAvatarChange}>
                      <Avatar src={newAvatarPreview ?? user.image} />
                    </UploadImage>
                    <Button isDisabled={!newAvatar} onClick={handleAvatarUpload}>
                      Upload and save
                    </Button>
                  </Flex>
                  <Divider />
                  <Box>
                    <Heading size="sm" mb="2">
                      Bio
                    </Heading>
                    <Text size="sm" color="gray.600">
                      Tell us a little about yourself
                    </Text>
                    <Textarea
                      value={currentSettings.bio ?? ""}
                      onChange={(e) => setCurrentSettings({ ...currentSettings, bio: e.target.value })}
                    />
                  </Box>
                </Stack>
              </Box>

              {/*Contact Information*/}
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
                        <Flex gap="4" direction={isLargerThan768 ? "row" : "column"}>
                          <Heading size="sm" alignSelf={isLargerThan768 ? "center" : ""}>
                            Phone number
                          </Heading>
                          <Input
                            value={currentSettings.phone ?? ""}
                            maxW="400px"
                            onChange={(e) =>
                              setCurrentSettings({
                                ...currentSettings,
                                phone: e.target.value === "" ? null : e.target.value,
                              })
                            }
                          ></Input>
                        </Flex>
                      </Box>
                    </Stack>
                  </FormControl>
                </Stack>
              </Box>

              {/*Additional Information*/}
              <Box borderWidth="1px" borderRadius="lg" padding="5">
                <Stack spacing="5">
                  <Heading>Additional Information</Heading>
                  <Stack spacing="5">
                    <Divider />
                    <Box>
                      <Flex gap="4" direction={isLargerThan768 ? "row" : "column"}>
                        <Heading size="sm" alignSelf={isLargerThan768 ? "center" : ""} w="100px">
                          Company
                        </Heading>
                        <Input
                          value={currentSettings.company ?? ""}
                          maxW="400px"
                          onChange={(e) =>
                            setCurrentSettings({
                              ...currentSettings,
                              company: e.target.value === "" ? null : e.target.value,
                            })
                          }
                        ></Input>
                      </Flex>
                    </Box>
                    <Divider />
                    <Box>
                      <Flex gap="4" direction={isLargerThan768 ? "row" : "column"}>
                        <Heading size="sm" alignSelf={isLargerThan768 ? "center" : ""} w="100px">
                          Location
                        </Heading>
                        <Input
                          value={currentSettings.location ?? ""}
                          maxW="400px"
                          onChange={(e) =>
                            setCurrentSettings({
                              ...currentSettings,
                              location: e.target.value === "" ? null : e.target.value,
                            })
                          }
                        ></Input>
                      </Flex>
                    </Box>
                    <Divider />
                    <Box>
                      <Flex gap="4" direction={isLargerThan768 ? "row" : "column"}>
                        <Heading size="sm" alignSelf={isLargerThan768 ? "center" : ""} w="100px">
                          Country
                        </Heading>
                        <Input
                          value={currentSettings.country ?? ""}
                          maxW="400px"
                          onChange={(e) =>
                            setCurrentSettings({
                              ...currentSettings,
                              country: e.target.value === "" ? null : e.target.value,
                            })
                          }
                        ></Input>
                      </Flex>
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              {/*Link*/}
              <Box borderWidth="1px" borderRadius="lg" padding="5">
                <Stack spacing="5">
                  <Heading>Link</Heading>
                  <Stack spacing="5">
                    <Divider />
                    <Box>
                      <Text size="sm" color="gray.600">
                        Using this code, your patients can send you a link request
                      </Text>
                      <Flex gap="4">
                        <Code fontSize="xl" alignSelf="center">
                          {user.therapist_code}
                        </Code>
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
      <SaveSettingsPrompt handleSave={handleSave} handleReset={resetSettings} isOpen={settingsHaveChanged} />
    </Container>
  );
}

export default UserSettings;
