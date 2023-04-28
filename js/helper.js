const calcDayPassed = function (date) {
  const day = Math.round(Math.abs(new Date() - date));
  return Math.round(day / (1000 * 60 * 60 * 24));
};

const formatDate = function (day) {
  const week = Math.round(day / 7);
  const month = Math.round(day / 31);
  const year = Math.round(day / 365);

  if (day === 0) return "Today";
  if (day === 1) return "Yesterday";
  if (day < 7) return `${day} days ago`;
  if (day < 30) return `${week} week${week === 1 ? "" : "s"} ago`;
  if (day < 365) return `${month} month${month === 1 ? "" : "s"} ago`;
  if (day > 365) return `${year} year${year === 1 ? "" : "s"} ago`;
};

export const formattedDate = (date) => {
  const day = calcDayPassed(date);
  return formatDate(day);
};
