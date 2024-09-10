import { getRequestsList } from '~/services/requestsList';

export default defineEventHandler(async (event) => {
  const wallet = getRouterParam(event, 'wallet');

  const requests = await getRequestsList(wallet);

  return {
    wallet,
    requests,
  };
});
