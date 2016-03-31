import formatNumber from 'format-number';

export const formatSplit = (seconds, round=2) => {
  let result = '';
  if (seconds) {
    const minutes = Number.parseInt(seconds/60);
    const remainder = formatNumber({padLeft: 2, padRight: round, round})(seconds - (minutes*60));
    return `${minutes}:${remainder}`;
  } else {
    return '';
  }
}

export const formatStamp = (millis) => formatDate(new Date(millis));

export const formatDate = (date) => {
  if (date) {
    const parts = [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate()
    ];
    const partFormat = formatNumber({padLeft: 2, integerSeparator: ''});
    return parts.map(partFormat).join('-');
  } else return '';
}

export const formatWatts = formatNumber({round: 0});
export const formatWeight = formatNumber({round: 1, padRight: 1});
export const formatWattsPerKg = formatNumber({padRight: 2, round: 2});
export const formatTime = (millis) => formatSplit(millis/1000);
