import { Link as RouterLink } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Link,
  Stack,
  Icon,
  Flex,
  Heading,
  Spacer,
  useMediaQuery,
  Text,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Center,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaRegCalendar, FaRegListAlt, FaUserAlt } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import Notifications from "./Notifications";

function Sidebar() {
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, user, logOut } = useAuth();

  return (
    <>
      <Flex bg="gray.100" w="full" height="4rem" px="5" alignItems="center" gap="2">
        {/* button for opening the sidebar */}
        <HamburgerIcon w={8} h={8} cursor="pointer" onClick={onOpen} />
        {isLargerThan992 && (
          <Heading size="lg" ml="5" mb="1">
            Speech Therapist
          </Heading>
        )}
        <Spacer />

        {/* display notification, avatar and user email if they are logged in */}
        {auth?.accessToken ? (
          <>
            <Notifications />
            <Popover>
              <PopoverTrigger>
                <Button>
                  <Flex>
                    <Avatar src={user?.image} size="sm" mr="2" />
                    <Text mt="1">{user?.email}</Text>
                  </Flex>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <Link as={RouterLink} to="/UserSettings">
                      <Center>User Settings</Center>
                    </Link>
                    <Divider />
                    <Center>
                      <Link onClick={logOut}>Log out</Link>
                    </Center>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            {/* if not logged in, provide links for navigating to sign up and login page */}
            <Link as={RouterLink} to="/SignUp" color="blue.500">
              Sign up
            </Link>
            <Link as={RouterLink} to="/Login" color="blue.500">
              Login
            </Link>
          </>
        )}
      </Flex>

      {/* Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {/* this stack contains links to other pages */}
            <Stack mt="10">
              <Link as={RouterLink} to="/" onClick={onClose}>
                <Button w="full" pr="10">
                  <Icon mr="4" as={BsFillHouseFill} />
                  Dashboard
                </Button>
              </Link>
              <Link as={RouterLink} to="/Patients" onClick={onClose}>
                <Button w="full" pr="10">
                  <Icon mr="4" as={FaUserAlt} />
                  Patients
                </Button>
              </Link>
              <Link as={RouterLink} to="/Calendar" onClick={onClose}>
                <Button w="full" pr="10">
                  <Icon mr="4" as={FaRegCalendar} />
                  Calendar
                </Button>
              </Link>
              <Link as={RouterLink} to="/Exercises" onClick={onClose}>
                <Button w="full" pr="10">
                  <Icon mr="4" as={FaRegListAlt} />
                  Exercises
                </Button>
              </Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
