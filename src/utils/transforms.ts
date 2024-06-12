export function dateTransform(date: string | undefined): string {
  if (!date) return "no date";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const inputDate = new Date(date);

  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date format");
  }

  return inputDate.toLocaleDateString(undefined, options);
}

export function publicTransfor(isPublic: boolean | undefined): string {
  return isPublic ? "Public" : "Private";
}

export function capitalized(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function shuffleArray<T extends Array<unknown>>(array: T) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
