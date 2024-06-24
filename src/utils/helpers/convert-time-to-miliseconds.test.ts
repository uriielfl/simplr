import { convertTimeToMiliseconds } from './convert-time-to-miliseconds';

describe('convertTimeToMiliseconds', () => {
  it('should convert days to miliseconds', () => {
    const ONE_DAY_IN_MILISECONDS = convertTimeToMiliseconds({ days: 1 });
    expect(ONE_DAY_IN_MILISECONDS).toBe(86400000);
  });

  it('should convert hours to miliseconds', () => {
    const ONE_HOUR_IN_MILISECONDS = convertTimeToMiliseconds({ hours: 1 });
    expect(ONE_HOUR_IN_MILISECONDS).toBe(3600000);
  });

  it('should convert minutes to miliseconds', () => {
    const ONE_MINUTE_IN_MILISECONDS = convertTimeToMiliseconds({ minutes: 1 });
    expect(ONE_MINUTE_IN_MILISECONDS).toBe(60000);
  });

  it('should convert seconds to miliseconds', () => {
    const ONE_SECOND_IN_MILISECONDS = convertTimeToMiliseconds({ seconds: 1 });
    expect(ONE_SECOND_IN_MILISECONDS).toBe(1000);
  });
});
