import { Box, Grid, GridItem, Center, Text, Icon, Image, useMediaQuery } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { TaskResult, AnswerChoice, Answer } from "../../types/commonTypes";

function CPImageAnswerCard({ answer, type }: { answer: Answer; type: string }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const gridItemWidth = isLargerThan768 ? "150px" : "75px";
  const gridItemHeight = type === "image" ? (isLargerThan768 ? "150px" : "75px") : "40px";
  const iconSize = isLargerThan768 ? "75px" : "50px";

  return (
    <Box maxW="800px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Grid templateRows="repeat(3, 1fr)" templateColumns="1fr 0.3fr 1fr" gap={4}>
        <GridItem
          borderWidth="2px"
          borderColor={answer.answer[0].is_correct ? "green.300" : "red.300"}
          borderRadius="lg"
        >
          <Center h={gridItemHeight}>
            <Text>{answer.answer[0].data1}</Text>
          </Center>
        </GridItem>

        <GridItem>
          <Center w={gridItemWidth} h={gridItemHeight}>
            <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
          </Center>
        </GridItem>

        <GridItem>
          <Center h={gridItemHeight}>
            {type === "image" ? (
              <Image src={answer.answer[0].data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
            ) : (
              <Text>{answer.answer[0].data2}</Text>
            )}
          </Center>
        </GridItem>

        <GridItem
          borderWidth="2px"
          borderColor={answer.answer[1].is_correct ? "green.300" : "red.300"}
          borderRadius="lg"
        >
          <Center h={gridItemHeight}>
            <Text>{answer.answer[1].data1}</Text>
          </Center>
        </GridItem>

        <GridItem>
          <Center w={gridItemWidth} h={gridItemHeight}>
            <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
          </Center>
        </GridItem>

        <GridItem>
          <Center h={gridItemHeight}>
            {type === "image" ? (
              <Image src={answer.answer[1].data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
            ) : (
              <Text>{answer.answer[1].data2}</Text>
            )}
          </Center>
        </GridItem>

        <GridItem
          borderWidth="2px"
          borderColor={answer.answer[2].is_correct ? "green.300" : "red.300"}
          borderRadius="lg"
        >
          <Center h={gridItemHeight}>
            <Text>{answer.answer[2].data1}</Text>
          </Center>
        </GridItem>

        <GridItem>
          <Center w={gridItemWidth} h={gridItemHeight}>
            <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
          </Center>
        </GridItem>

        <GridItem>
          <Center h={gridItemHeight}>
            {type === "image" ? (
              <Image src={answer.answer[2].data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
            ) : (
              <Text>{answer.answer[2].data2}</Text>
            )}
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
}
export default CPImageAnswerCard;
