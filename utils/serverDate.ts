export function ServerDate(date: string | Date): Date {
  //date = (date as string);
  date = new Date(date);
  const newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return newDate;
}
