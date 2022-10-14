import { Box, Grid, GridItem, Center, Text, Icon, Image } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { TaskResult, AnswerChoice, Answer } from "../../types/commonTypes";

function CPImageAnswerCard({ answer, type }: { answer: Answer; type: string }) {
  const itemHeight = "50px";
  const itemWidth = "200px";
  const gridItemWidth = "150px";
  const iconSize = "150px";

  console.log("answer:", answer);

  return (
    <Box maxW="800px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Grid templateRows="repeat(3, 1fr)" templateColumns="1fr 0.3fr 1fr" gap={4}>
        <GridItem>
          <Center h={itemHeight}>
            <Text>{answer.answer[0].data1}</Text>
          </Center>
        </GridItem>

        <GridItem>
          <Center w={itemWidth} h={itemHeight}>
            <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
          </Center>
        </GridItem>

        {type === "image" ? (
          <Image src={answer.answer[0].data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
        ) : (
          <GridItem>
            <Center h={itemHeight}>
              <Text>{answer.answer[0].data2}</Text>
            </Center>
          </GridItem>
        )}

        <GridItem>
          <Center h={itemHeight}>
            <Text>{answer.answer[1].data1}</Text>
          </Center>
        </GridItem>

        <GridItem>
          <Center w={itemWidth} h={itemHeight}>
            <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
          </Center>
        </GridItem>

        {type === "image" ? (
          <Image src={answer.answer[1].data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
        ) : (
          <GridItem>
            <Center h={itemHeight}>
              <Text>{answer.answer[1].data2}</Text>
            </Center>
          </GridItem>
        )}

        <GridItem>
          <Center h={itemHeight}>
            <Text>{answer.answer[2].data1}</Text>
          </Center>
        </GridItem>

        <GridItem>
          <Center w={itemWidth} h={itemHeight}>
            <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
          </Center>
        </GridItem>

        {type === "image" ? (
          <Image src={answer.answer[2].data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
        ) : (
          <GridItem>
            <Center h={itemHeight}>
              <Text>{answer.answer[2].data2}</Text>
            </Center>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default CPImageAnswerCard;
