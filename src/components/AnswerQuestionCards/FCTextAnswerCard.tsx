import { useMediaQuery, Grid, GridItem, Box, Text, Image } from "@chakra-ui/react";
import { TaskType } from "../../types/enums";
import { AnswerFourChoicesChoice } from "../../types/taskResultTypes";

function FCTextAnswerCard({ answer, type }: { answer: AnswerFourChoicesChoice; type: TaskType }) {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const templateRowsLg = "3 0.5fr 0.5fr";
  const templateColumnsLg = "0.5fr 0.5fr";

  const templateRowsSm = "3 repeat(4, 0.25fr)";
  const templateColumnsSm = "1fr";

  const answerImages = [
    answer.correct_option,
    answer.incorrect_option1,
    answer.incorrect_option2,
    answer.incorrect_option3,
  ];
  return (
    <Box w="full" maxW="600px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Grid
        templateRows={isLargerThan600 ? templateRowsLg : templateRowsSm}
        templateColumns={isLargerThan600 ? templateColumnsLg : templateColumnsSm}
        gap={4}
        textAlign="center"
      >
        <GridItem rowSpan={1} colSpan={isLargerThan600 ? 2 : 1} mx="auto" minW="200px">
          <Text maxW="400px" borderWidth="1px" borderColor="gray.200">
            {answer.question_data}
          </Text>
        </GridItem>
        {answerImages.map((answerImage, index) => {
          return (
            <GridItem
              key={index}
              rowSpan={1}
              colSpan={1}
              borderWidth={"2px"}
              borderRadius="lg"
              borderColor={index === 0 ? "green.400" : index === 1 && !answer.is_correct ? "red.400" : "gray.300"}
              h="150px"
              textAlign="center"
              w="150px"
              mx="auto"
            >
              <Image src={answerImage} boxSize={"146px"} objectFit="cover" borderRadius="lg" cursor={"default"} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default FCTextAnswerCard;
