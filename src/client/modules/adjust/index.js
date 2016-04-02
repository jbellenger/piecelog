export const weightFactor = (pounds) => Math.pow(pounds/270, .222);
export const weightAdjustTime = (pounds, time) => weightFactor(pounds) * time;
export const weightAdjustDistance = (pounds, distance) => distance/weightFactor(pounds);
