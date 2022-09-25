import { useContext, createContext, useState } from "react";

const TagContext = createContext<any>({});

type Children = {
  children: React.ReactNode;
};

export function useTagContext() {
  return useContext(TagContext);
}

export function TagProvider({ children }: Children) {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  function toggleTag(id: string) {
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
