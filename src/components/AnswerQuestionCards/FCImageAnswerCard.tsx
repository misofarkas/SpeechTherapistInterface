import { useMediaQuery, Grid, GridItem, Box, Image, Text } from "@chakra-ui/react";
import { TaskType } from "../../types/enums";
import { AnswerFourChoicesChoice } from "../../types/taskResultTypes";

function FCImageAnswerCard({ answer, type }: { answer: AnswerFourChoicesChoice; type: TaskType }) {

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const templateRowsLg = "repeat(2, 1fr)";
  const templateColumnsLg = "0.5fr repeat(2, 1fr)";


  const templateRowsSm = "1fr repeat(5, 0.3fr)";
  const templateColumnsSm = "1fr";

  const textAnswers = [
    answer.correct_option,
    answer.incorrect_option1,
    answer.incorrect_option2,
    answer.incorrect_option3,
  ];
  return (
    <Box w="full" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Grid
        templateRows={isLargerThan768 ? templateRowsLg : templateRowsSm}
        templateColumns={isLargerThan768 ? templateColumnsLg : templateColumnsSm}
        gap={4}
        textAlign="center"
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          borderWidth={"1px"}
          borderRadius="lg"
          h="150px"
          textAlign="center"
          w="150px"
          mx="auto"
        >
          <Image src={answer.question_data} boxSize={"150px"} objectFit="cover" borderRadius="lg" />
        </GridItem>

        {textAnswers.map((textAnswer, index) => {
          return (
            <GridItem key={index} colSpan={1}>
              <Text maxW="400px" borderWidth="2px" borderColor="green.400">
                {textAnswer}
              </Text>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default FCImageAnswerCard;
