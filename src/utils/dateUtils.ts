//https://stackoverflow.com/questions/28760254/assign-javascript-date-to-html5-datetime-local-input
export const getLocalDateTime = () => {
  const d = new Date();
  const dateTimeLocalValue = new Date(
    d.getTime() - d.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, -5);
  return dateTimeLocalValue;
};

export const formatLocalDateTime = (localDateTime) => {
  const fakeUtcTime = new Date(`${localDateTime}Z`);
  const d = new Date(
    fakeUtcTime.getTime() + fakeUtcTime.getTimezoneOffset() * 60000,
  ).toISOString();
  return d;
};

export const combineDateAndTime = (date: string, time: string) => {
  return new Date(`${date}T${time}`).toISOString();
};
