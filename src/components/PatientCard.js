import React from "react";
import { Box, Avatar, Flex } from "@chakra-ui/react";

function PatientCard({ name, avatarUrl }) {
  return (
    <Box  w="full" boxShadow="lg" flex="1" p="2" mb="2">
      <Flex>
        <Avatar src={avatarUrl} alt="avatar" m="2"/>
        <div>
          <p>Patient</p>
          <h3>{name}</h3>
        </div>
      </Flex>
    </Box>
  );
}

export default PatientCard;
