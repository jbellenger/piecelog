export const weightFactor = (pounds) => Math.pow(pounds/270, .222);
export const weightAdjustTime = (pounds, time) => weightFactor(pounds) * time;
export const weightAdjustDistance = (pounds, distance) => distance/weightFactor(pounds);

export const AGE_K_8PLUS_4X = .020;
export const AGE_K_2X_4 = .0216;
export const AGE_K_1X_2MINUS = .025;

// http://www.usrowing.org/docs/default-source/masters/mhandchart.pdf
export const ageHandicap1k = (racingage, k) => {
  if (!racingage) return 0;
  if (racingage <= 27) return 0;
  const hc = Math.pow(racingage - 27, 2) * k;
  return Math.floor(hc);
};
