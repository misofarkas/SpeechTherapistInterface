
// Cuts the input string to a chosen length
export function adjustStringLength(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
  
    return text.slice(0, maxLength) + "...";
  }