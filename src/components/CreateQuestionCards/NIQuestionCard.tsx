import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  useMediaQuery,
  Center,
} from "@chakra-ui/react";
import QuestionInput from "../QuestionTextInput";
import SelectImageModal from "../SelectImageModal";

function NIQuestionCard() {
  const [selectedInputId, setSelectedInputId] = useState(1);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  function handleImageSelection(id: string, index: number) {
    setSelectedImageId(id)
  }

  const templateRowsLg = "repeat(2, 1fr)";
  const templateColumnsLg = "150px repeat(2, 1fr)";

  const imageSelected = selectedImageId !== undefined

  const templateRowsSm = "1fr repeat(5, 0.3fr)";
  const templateColumnsSm = "1fr";
  return (
    <Box
      w="full"
      p="1rem 2rem"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Grid
        templateRows={isLargerThan768 ? templateRowsLg : templateRowsSm}
        templateColumns={
          isLargerThan768 ? templateColumnsLg : templateColumnsSm
        }
        gap={4}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          borderWidth={imageSelected ? "0" : "1px"}
          borderRadius="lg"
          h="150px"
          textAlign="center"
          cursor="pointer"
          w="150px"
          mx="auto"
        >
          <SelectImageModal selectedImageId={selectedImageId} setSelectedImageId={handleImageSelection} boxSize="150px" imageIndex={undefined} />
        </GridItem>
        <GridItem colSpan={1}>
          <QuestionInput
            id={1}
            selectedInputId={selectedInputId}
            setSelectedInputId={setSelectedInputId}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <QuestionInput
            id={2}
            selectedInputId={selectedInputId}
            setSelectedInputId={setSelectedInputId}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <QuestionInput
            id={3}
            selectedInputId={selectedInputId}
            setSelectedInputId={setSelectedInputId}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <QuestionInput
            id={4}
            selectedInputId={selectedInputId}
            setSelectedInputId={setSelectedInputId}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default NIQuestionCard;
