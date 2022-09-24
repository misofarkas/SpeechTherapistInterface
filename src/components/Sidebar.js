import React from "react";
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
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaRegCalendar, FaRegListAlt, FaUserAlt } from "react-icons/fa";

function Sidebar() {
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        bg="gray.100"
        w="full"
        height="4rem"
        px="5"
        alignItems="center"
        gap="2"
      >
        <HamburgerIcon
          w={8}
          h={8}
          cursor="pointer"
          onClick={onOpen}
        />
        {isLargerThan992 && (
          <Heading size="lg" ml="5" mb="1">
            Speech Therapist
          </Heading>
        )}
        <Spacer />
        <Link as={RouterLink} to="/SignUp" color="blue.500">
          Sign up
        </Link>
        <Link as={RouterLink} to="/Login" color="blue.500">
          Login
        </Link>
        <Popover>
          <PopoverTrigger>
            <Button>
              <Flex>
                <Avatar
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                  size="sm"
                  mr="2"
                />
                <Text mt="1">Jon Doe</Text>
              </Flex>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Somethingsomethingsadawdawdas</PopoverHeader>
            <PopoverBody>
              <Stack>
                <Center>
                  Settings
                </Center>
                <Divider/>
                <Center>
                  About page
                </Center>
                <Center>
                  Log out
                </Center>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack mt="10">
              <Link as={RouterLink} to="/" onClick={onClose}>
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
