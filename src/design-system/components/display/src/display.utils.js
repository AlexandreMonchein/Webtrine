import differenceInDays from "date-fns/differenceInDays";

export function pluralize(name, colors) {
  const num = colors.length;
  return num === 1 ? `1 ${name} Available` : `${num} ${name}s Available`;
}

export function isNew(releaseDate) {
  return differenceInDays(new Date(), releaseDate) < 30;
}
