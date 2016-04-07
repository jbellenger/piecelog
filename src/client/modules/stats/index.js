import sortBy from 'lodash/sortBy';

export const sum = (values) => values.reduce((acc, x) => acc + x, 0);
export const mean = (values) => sum(values)/values.length;
export const min = (values) => Math.min(...values);
export const max = (values) => Math.max(...values);

export const median = (values) => {
  const sorted = sortBy(values);
  return sorted[Number.parseInt(sorted.length/2)];
}

export const apply = (values) => {
  return {
    mean: mean(values),
    min: min(values),
    max: max(values),
    median: median(values),
  };
};
