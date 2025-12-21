import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // ← dayjs本体に含まれている
import timezone from "dayjs/plugin/timezone"; // ← dayjs本体に含まれている

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDateTimeFormat = (date: Date | string) => {
  return dayjs(date).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm");
};
