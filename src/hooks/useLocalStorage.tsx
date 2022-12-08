import { useState } from "react";


export default function useLocalStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {

    // If the user is not on a browser, return the initial value
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Attempt to retrieve the value from local storage using the provided key
      const item = window.localStorage.getItem(key);

      // If the item exists, parse it and return it
      // Otherwise, return the initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      // If the user is on a browser, set the value in local storage using the provided key
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
