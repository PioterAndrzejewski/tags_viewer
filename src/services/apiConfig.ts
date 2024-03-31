const STACK_EXCHANGE_URL = "https://api.stackexchange.com/2.3/";

export const apiConfig = {
  get: {
    tags: (query: string) => `${STACK_EXCHANGE_URL}?${query}`,
  },
};
