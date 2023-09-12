function truncateText(str: string | null, count: number) {
  if (!str || (str.length < count)) return str;
  return str.substring(0, count) + "...";
}

export { truncateText };
