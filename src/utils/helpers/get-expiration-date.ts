export const getExpirationDate = (ttl: number) => {
  return Date.now() + ttl;
};
