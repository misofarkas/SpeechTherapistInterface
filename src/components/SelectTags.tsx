import { useTagContext } from "../contexts/TagContext";
import { useState } from "react";
import { Input, Tag, TagLabel, Wrap, Box } from "@chakra-ui/react";
import getTags from "../api/getTags";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "react-query";

function SelectTags({ withFilter = false }: { withFilter?: boolean }) {
  const { toggleTag, isSelected } = useTagContext();
  const [filterValue, setFilterValue] = useState("");
  const { auth } = useAuth();

  const { data: tags } = useQuery("tags", () => getTags({auth}));

  const filteredTagData =
    tags === undefined ? [] : tags.data.filter((tag) => tag.name.toLowerCase().includes(filterValue.toLowerCase()));

  return (
    <Box>
      {withFilter && <Input mt="5" mb="2" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}></Input>}
      <Wrap>
        {filteredTagData.map((tag) => {
          return (
            <Tag
              minW="75px"
              key={tag.name}
              onClick={() => toggleTag(tag.name)}
              transition="0.2s"
              _hover={{
                bg: isSelected(tag.name) ? "green.300" : "gray.200",
              }}
              cursor="pointer"
              bg={isSelected(tag.name) ? "green.200" : "gray.100"}
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
