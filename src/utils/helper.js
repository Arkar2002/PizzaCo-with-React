import { formatDistance, parseISO } from "date-fns";

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const formateDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true }).replaceAll(
    "about",
    " ",
  );

export const calcMinleft = (dateStr) => {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
};
