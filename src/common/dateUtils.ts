
// Checks wether the input date is the today's date
export function dateIsToday(input: string) {
  const today = new Date();
  const date = new Date(input);
  return (
    date.getDay() === today.getDay() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
