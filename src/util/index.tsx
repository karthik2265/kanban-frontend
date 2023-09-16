import { nanoid } from "nanoid";

function truncateText(str: string | null, count: number) {
  if (!str || str.length < count) return str;
  return str.substring(0, count) + "...";
}

function generateTemporaryId() {
  return `tempId-${nanoid()}`;
}

export { truncateText, generateTemporaryId };
