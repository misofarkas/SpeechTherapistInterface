import { useTagContext } from "../contexts/TagContext";
import { useState } from "react";
import { TagData } from "../data/TagData";
import { Input, Stack, Tag, TagLabel, Wrap, Box } from "@chakra-ui/react";

function SelectTags({ withFilter = false }) {
  const { toggleTag, isSelected } = useTagContext();
  const [filterValue, setFilterValue] = useState("");

  const filteredTagData = TagData.filter((tag) => tag.name.toLowerCase().includes(filterValue.toLowerCase()));

  return (
    <Box>
      {withFilter && <Input mt="5" mb="2" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}></Input>}
      <Wrap>
        {filteredTagData.map((tag) => {
          return (
            <Tag
              minW="75px"
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              transition="0.2s"
              _hover={{
                bg: isSelected(tag.id) ? "green.300" : "gray.200",
              }}
              cursor="pointer"
              bg={isSelected(tag.id) ? "green.200" : "gray.100"}
            >
              <TagLabel mx="auto">{tag.name}</TagLabel>
            </Tag>
          );
        })}
      </Wrap>
    </Box>
  );
}

export default SelectTags;
