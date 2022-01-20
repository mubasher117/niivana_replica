const convertTimestamptoTime = (ts: string) => {
  const t = new Date(parseInt(ts) / 10000);
  const hours = t.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const minutes = t.getMinutes();
  return `${hours % 12}:${minutes > 9 ? minutes : '0' + minutes}  ${ampm}`;
};
export default convertTimestamptoTime;
export const getPubnubDateAndTime = (ts: string) => {
  const date = new Date(parseInt(ts) / 10000);
  const minutes = date.getMinutes();
  return {
    time: `${date.getHours()}:${minutes > 9 ? minutes : '0' + minutes}`,
    date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
  };
};

export const getDateWithoutTime = (date: string) => {
  const d = new Date(date);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[d.getMonth()];
  return `${monthName} ${d.getDate()}, ${d.getFullYear()}`;
};
