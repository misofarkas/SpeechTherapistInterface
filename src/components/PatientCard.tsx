import { Box, Avatar, Flex } from "@chakra-ui/react";

type ProfileCardInfo = {
  name: string;
  avatarUrl: string;
};

function PatientCard({ name, avatarUrl }: ProfileCardInfo) {
  return (
    <Box w="full" boxShadow="lg" flex="1" p="2" mb="2">
      <Flex>
        <Avatar src={avatarUrl} m="2" />
        <div>
          <p>Patient</p>
          <h3>{name}</h3>
        </div>
      </Flex>
    </Box>
  );
}

export default PatientCard;
