import { useState } from "react";
import { Box, Grid, GridItem, Image, useMediaQuery, Input, CloseButton } from "@chakra-ui/react";
import SelectImageModal from "../SelectImageModal";
import { CustomChoice, FourChoicesQuestion } from "../../types/questionTypes";

function FCTextQuestionCard({
  isEditable,
  question,
  handleUpdateChoice = undefined,
  handleDeleteQuestion = undefined,
  imageData = undefined,
}: {
  isEditable: boolean;
  question: FourChoicesQuestion;
  handleUpdateChoice?: ((a: string, b: string, c: string, d: number) => void) | undefined;
  handleDeleteQuestion?: ((a: string) => void) | undefined;
  imageData?: CustomChoice[] | undefined;
}) {

  const [selectedImageId, setSelectedImageId] = useState<string | undefined>();

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const selectedImages = [
    question.choices[0].correct_option,
    question.choices[0].incorrect_option1,
    question.choices[0].incorrect_option2,
    question.choices[0].incorrect_option3,
  ];


  const templateRowsLg = "3 0.5fr 0.5fr";
  const templateColumnsLg = "0.5fr 0.5fr";

  const imageSelected = selectedImageId !== undefined;

  const templateRowsSm = "3 repeat(4, 0.25fr)";
  const templateColumnsSm = "1fr";
  console.log("ed ?",isEditable)
  return (
    <Box w="full" maxW="800px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      {isEditable && <CloseButton ml="95%" mb="2" onClick={() => handleDeleteQuestion!(question.id)}></CloseButton>}
      <Grid
        templateRows={isLargerThan600 ? templateRowsLg : templateRowsSm}
        templateColumns={isLargerThan600 ? templateColumnsLg : templateColumnsSm}
        gap={4}
        textAlign="center"
      >
        <GridItem rowSpan={1} colSpan={isLargerThan600 ? 2 : 1}>
          <Input
            maxW="400px"
            borderWidth="1px"
            borderColor="gray.200"
            value={question.choices[0].question_data}
            onChange={(e) => {
              handleUpdateChoice !== undefined &&
                handleUpdateChoice(question.id, question.choices[0].id, e.target.value, 0);
            }}
          />
        </GridItem>
        {selectedImages.map((selectedImage, index) => {
          return (
            <GridItem
              key={index}
              rowSpan={1}
              colSpan={1}
              borderWidth={imageSelected ? "0" : "2px"}
              borderRadius="lg"
              borderColor={index === 0 ? "green.400" : "gray.200"}
              h="150px"
              textAlign="center"
              cursor="pointer"
              w="150px"
              mx="auto"
            >
              {isEditable ? (
                <SelectImageModal
                  selectedImageUrl={selectedImage ?? ""}
                  handleUpdateChoice={handleUpdateChoice}
                  boxSize={"146px"}
                  imageData={imageData ?? []}
                  questionId={question.id}
                  choiceId={question.choices[0].id}
                  changeIndex={index + 1}
                />
              ) : (
                <Image src={selectedImage} boxSize={"146px"} objectFit="cover" borderRadius="lg" cursor={"default"}/>
              )}
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default FCTextQuestionCard;
