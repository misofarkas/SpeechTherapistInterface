import { useContext, createContext, useState } from "react";

const TagContext = createContext<any>({});

// Custom hook for consuming the context value
export function useTagContext() {
  return useContext(TagContext);
}

export function TagProvider({ children }: { children: React.ReactNode }) {
  // Initialize the selectedTags state with an empty array
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Function for toggling the selection of a tag
  function toggleTag(name: string) {
    // If the tag is already selected, filter it out of the selectedTags array
    // Otherwise, add it to the array
    selectedTags.includes(name)
      ? setSelectedTags(selectedTags.filter((e) => e !== name))
      : setSelectedTags([...selectedTags, name]);
  }

  // Function for checking if a tag is selected
  function isSelected(name: string) {
    return selectedTags.includes(name);
  }

  const value = { selectedTags, toggleTag, isSelected };
  
  // Return a Provider component with the context value set to the value object
  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}
