import { useState } from "react";
import { Box, Grid, GridItem, Text, Image, useMediaQuery, Center, Input, CloseButton } from "@chakra-ui/react";
import { ImageData } from "../../data/ImageData";
import SelectImageModal from "../SelectImageModal";
import { BasicChoice, Question } from "../../types/commonTypes";

function NIQuestionCard({
  isEditable,
  question,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  isEditable: boolean;
  question: Question;
  handleUpdateChoice?: ((a: string, b: string, c: string | undefined, d: string | undefined) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: BasicChoice[] | undefined;
}) {
  const [selectedInputId, setSelectedInputId] = useState(1);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const selectedImage = ImageData.find((image) => image.id === selectedImageId);
  function handleImageSelection(id: string, index: number) {
    setSelectedImageId(id);
  }

  const templateRowsLg = "repeat(2, 1fr)";
  const templateColumnsLg = "0.5fr repeat(2, 1fr)";

  const imageSelected = selectedImageId !== undefined;

  const templateRowsSm = "1fr repeat(5, 0.3fr)";
  const templateColumnsSm = "1fr";
  return (
    <Box w="full" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      {isEditable && <CloseButton ml="95%" mb="2" onClick={() => handleDeleteQuestion!(question.id)}></CloseButton>}
      <Grid
        templateRows={isLargerThan768 ? templateRowsLg : templateRowsSm}
        templateColumns={isLargerThan768 ? templateColumnsLg : templateColumnsSm}
        gap={4}
        textAlign="center"
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
          <SelectImageModal
            selectedImageUrl={question.choices[0].image ?? ""}
            handleUpdateChoice={handleUpdateChoice}
            boxSize={"150px"}
            imageData={imageData ?? []}
            questionId={question.id}
            choiceId={question.choices[0].id}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            value={question.choices[0].text}
            onChange={(e) => {
              handleUpdateChoice !== undefined &&
                handleUpdateChoice(question.id, question.choices[0].id, e.target.value, undefined);
            }}
            maxW="400px"
            borderWidth="2px"
            borderColor="green.400"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            maxW="400px"
            borderWidth="1px"
            borderColor="gray.200"
            value={question.choices[1].text}
            onChange={(e) => {
              handleUpdateChoice !== undefined &&
                handleUpdateChoice(question.id, question.choices[1].id, e.target.value, undefined);
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            maxW="400px"
            borderWidth="1px"
            borderColor="gray.200"
            value={question.choices[2].text}
            onChange={(e) => {
              handleUpdateChoice !== undefined &&
                handleUpdateChoice(question.id, question.choices[2].id, e.target.value, undefined);
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            maxW="400px"
            borderWidth="1px"
            borderColor="gray.200"
            value={question.choices[3].text}
            onChange={(e) => {
              handleUpdateChoice !== undefined &&
                handleUpdateChoice(question.id, question.choices[3].id, e.target.value, undefined);
            }}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default NIQuestionCard;
