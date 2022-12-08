import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  Icon,
  Box,
  Text,
  Flex,
  Divider,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineBell } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { HiX } from "react-icons/hi";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { getLinkRequests, acceptLinkRequest, rejectLinkRequest } from "../api/notificationsApi";

function Notifications() {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  // fetch notifications
  const { data: notificationsData } = useQuery("linkRequests", () => getLinkRequests({ auth }));

  // mutation for accepting a patient link request from notifications
  const acceptRequestMutation = useMutation(acceptLinkRequest, {
    onSuccess: () => {
      // Invalidate the "linkRequests" query when the mutation is successful.
      queryClient.invalidateQueries("linkRequests");
    },
  });

  // mutation for declining a patient link request from notifications
  const rejectRequestMutation = useMutation(rejectLinkRequest, {
    onSuccess: () => {
      // Invalidate the "linkRequests" query when the mutation is successful.
      queryClient.invalidateQueries("linkRequests");
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          {/** display red circle with the number of notifications */}
          {!!notificationsData?.data.length && (
            <Badge position="absolute" variant="solid" colorScheme="red" mr="5" mt="4" fontSize="2xs">
              {notificationsData.data.length}
            </Badge>
          )}
          <Icon boxSize={"2rem"} as={AiOutlineBell} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {/** display each notification individually */}
            {notificationsData?.data.map((request) => {
              return (
                <Box key={request.id}>
                  <Divider mb="2" />
                  <Flex gap="2">
                    <Avatar src={request.image} boxSize="3rem" alignSelf="center" />
                    <Stack spacing="0">
                      <Text as="b">{request.name}</Text>
                      <Text>wants to connect</Text>
                    </Stack>

                    <Flex alignSelf="center">
                      {/** accept button */}
                      <Button
                        backgroundColor={"transparent"}
                        onClick={() => acceptRequestMutation.mutate({ auth, id: request.id })}
                      >
                        <Icon as={FcCheckmark} />
                      </Button>

                      {/** decline button */}
                      <Button
                        backgroundColor={"transparent"}
                        color={"red"}
                        onClick={() => rejectRequestMutation.mutate({ auth, id: request.id })}
                      >
                        <Icon as={HiX} />
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
