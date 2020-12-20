export default function getDateBeforeDays(days = 0) {
  const date = new Date();
  const pastDate = date.getDate() - days;
  date.setDate(pastDate);
  return date.toJSON().slice(0, 10);
}
