import dayjs from "dayjs";

export const getDateTimeFormat = (date: Date | string) => {
  return dayjs(date).format("YYYY-MM-DD hh:mm");
};
