import React from 'react';
import {Link} from 'react-router';
import formatNumber from 'format-number';

export const formatSplit = (seconds) => {
  let result = '';
  const round = 1;
  if (seconds) {
    const minutes = Number.parseInt(seconds/60);
    const remainder = formatNumber({padLeft: 2, padRight: round, round})(seconds - (minutes*60));
    return `${minutes}:${remainder}`;
  } else {
    return '';
  }
};

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
  } else { 
    return '';
  }
};

export const formatWeight = formatNumber({round: 1, padRight: 1});
export const formatWattsPerKg = formatNumber({padRight: 2, round: 2});
export const formatTime = (millis) => formatSplit(millis/1000);
export const formatInteger = formatNumber({round: 0});
export const formatWatts = formatInteger;

export const formatPerson = (personId) => (
  <Link to={'/person/' + personId}>{personId}</Link>
);

export const formatWorkout = (workoutId) => (
  <Link to={'/workout/' + workoutId}>{workoutId}</Link>
);

export const formatEvent = (eventId) => (
  <Link to={'/event/' + eventId}>{formatStamp(eventId)}</Link>
);
