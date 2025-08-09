import dayjs from "dayjs";
import { DoubleCheckIcon, SingleCheckIcon } from "../assets/icons";

export const formatTime = (ts) => dayjs(ts).format("h:mm a");

export const getStatusIcon = (status) => {
  switch (status) {
    case "sent":
      return (
        <span className="text-gray-500">
          <SingleCheckIcon />
        </span>
      );
    case "delivered":
      return (
        <span className="text-gray-500">
          <DoubleCheckIcon />
        </span>
      );
    case "read":
      return (
        <span className="text-blue-500">
          <DoubleCheckIcon />
        </span>
      );
    default:
      return null;
  }
};