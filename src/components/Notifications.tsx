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
  const { data: notificationsData } = useQuery("linkRequests", () => getLinkRequests({ auth }));
  const acceptRequestMutation = useMutation(acceptLinkRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("linkRequests");
    },
  });
  const rejectRequestMutation = useMutation(rejectLinkRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("linkRequests");
    },
  });


  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <Icon boxSize={"25px"} as={AiOutlineBell} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {notificationsData?.data.map((request) => {
              return (
                <Box key={request.id}>
                  <Divider />
                  <Flex gap="2">
                    <Avatar src={request.image} boxSize="3rem" alignSelf="center" />
                    <Stack spacing="0">
                      <Text as='b'>{request.name}</Text>
                      <Text>wants to connect</Text>
                    </Stack>

                    <Flex alignSelf="center">
                      <Button
                        backgroundColor={"transparent"}
                        onClick={() => acceptRequestMutation.mutate({ auth, id: request.id })}
                      >
                        <Icon as={FcCheckmark} />
                      </Button>
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
