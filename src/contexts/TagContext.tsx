import { useContext, createContext, useState } from "react";

const TagContext = createContext<any>({});

export function useTagContext() {
  return useContext(TagContext);
}

export function TagProvider({ children }: { children: React.ReactNode }) {
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
