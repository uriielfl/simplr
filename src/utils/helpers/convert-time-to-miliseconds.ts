import { IExpiresAt } from '../interfaces/expires-at.interface';

const ONE_SECOND_IN_MILISECONDS = 1000;
const ONE_MINUTE_IN_MILISECONDS = 60000;
const ONE_HOUR_IN_MILISECONDS = 3600000;
const ONE_DAY_IN_MILISECONDS = 86400000;
export const convertTimeToMiliseconds = (time: IExpiresAt): number => {
  let miliseconds = 0;

  if (time.seconds) {
    miliseconds += time.seconds * ONE_SECOND_IN_MILISECONDS;
  }
  if (time.minutes) {
    miliseconds += time.minutes * ONE_MINUTE_IN_MILISECONDS;
  }
  if (time.hours) {
    miliseconds += time.hours * ONE_HOUR_IN_MILISECONDS;
  }
  if (time.days) {
    miliseconds += time.days * ONE_DAY_IN_MILISECONDS;
  }

  return miliseconds;
};
