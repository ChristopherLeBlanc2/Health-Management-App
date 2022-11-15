# MVP
Set reminders for medication times with dosages while also allowing tracking for other vitals
const convertTime = (hour, minute, period) => {
  let twentyFourHour = hour;

  if (period === "AM" && hour === 12) {
    twentyFourHour = 0;
  }

  if (period === "PM" && hour !== 12) {
    twentyFourHour += 12;
  }

  const date = new Date();

  const timezone = date.getTimezoneOffset() / 60;

  return `${twentyFourHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}-${timezone}`;
};