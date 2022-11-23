import { Box } from "@chakra-ui/react";

function PatientCard({ children }: { children: React.ReactNode }) {
  return (
    <Box w="full" boxShadow="lg" borderRadius={"2xl"} p="5" mb="2" borderWidth={"1px"}>
      {children}
    </Box>
  );
}

export default PatientCard;
