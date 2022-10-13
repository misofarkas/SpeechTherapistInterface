import { Box, Grid, GridItem, Center, Text, Icon, Image } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { TaskResult, AnswerChoice, Answer } from "../../types/commonTypes";

function CPImageAnswerCard({ answer, type }: { answer: Answer; type: string }) {
  const itemHeight = "50px";
  const itemWidth = "200px";
  const gridItemWidth = "200px";
  const iconSize = "150px";

  return (
    <Box maxW="800px" mx="auto" p="1rem 2rem" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Grid templateRows="repeat(3, 1fr)" templateColumns="1fr 0.3fr 1fr" gap={4}>
        <>
          {answer.answer.map((ans: AnswerChoice) => {
            <>
              <GridItem>
                <Center h={itemHeight}>
                  <Text>{ans.data1}</Text>
                </Center>
              </GridItem>

              <GridItem>
                <Center w={itemWidth} h={itemHeight}>
                  <Icon color="gray.300" boxSize={iconSize} as={BsArrowRight}></Icon>
                </Center>
              </GridItem>

              {type === "image" ? (
                <Image src={ans.data2 ?? ""} objectFit="cover" boxSize={gridItemWidth} borderRadius="lg" />
              ) : (
                <GridItem>
                  <Center h={itemHeight}>
                    <Text>{ans.data2}</Text>
                  </Center>
                </GridItem>
              )}
            </>;
          })}
        </>
      </Grid>
    </Box>
  );
}

export default CPImageAnswerCard;
