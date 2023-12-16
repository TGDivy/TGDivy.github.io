import type { CollectionEntry } from "astro:content";

// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.data.date && b.data.date).getTime() -
      new Date(a.data.date && a.data.date).getTime(),
  );
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: { data: { weight: any } }) => item.data.weight,
  );
  const withoutWeight = array.filter(
    (item: { data: { weight: any } }) => !item.data.weight,
  );
  const sortedWeightedArray = withWeight.sort(
    (a: { data: { weight: number } }, b: { data: { weight: number } }) =>
      a.data.weight - b.data.weight,
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};

// sort by stargazers_count
export const sortProjectByAttribute = (
  array: CollectionEntry<"projects">[],
  attribute: keyof CollectionEntry<"projects">["data"],
) => {
  const sortedArray = array.sort(
    (a, b) => Number(b.data[attribute]) - Number(a.data[attribute]),
  );
  return sortedArray;
};
