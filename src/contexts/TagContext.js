import React, { useContext, useState } from "react";

const TagContext = React.createContext();

export function useTagContext() {
  return useContext(TagContext);
}

export function TagProvider({ children }) {
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  function toggleTag(id) {
    selectedTagIds.includes(id)
      ? setSelectedTagIds(selectedTagIds.filter((i) => i !== id))
      : setSelectedTagIds([...selectedTagIds, id]);
  }

  const value = {
    selectedTagIds,
    toggleTag,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}
