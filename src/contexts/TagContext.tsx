import { useContext, createContext, useState } from "react";

const TagContext = createContext<any>({});

export function useTagContext() {
  return useContext(TagContext);
}

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);


  function toggleTag(name: string) {
    selectedTags.includes(name)
      ? setSelectedTags(selectedTags.filter((e) => e !== name))
      : setSelectedTags([...selectedTags, name]);
  }

  function isSelected(name: string) {
    return selectedTags.includes(name);
  }

  const value = {
    selectedTags,
    toggleTag,
    isSelected,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}
