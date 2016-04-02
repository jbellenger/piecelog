export const racing_dob = (dob) => {
  const rdob = new Date(0);
  rdob.setUTCFullYear(new Date(dob).getUTCFullYear());
  return rdob;
};

export const racing_age = (dob, now) => {
  const n = now ? new Date(now) : new Date();
  return n.getUTCFullYear() - racing_dob(dob).getUTCFullYear();
};
