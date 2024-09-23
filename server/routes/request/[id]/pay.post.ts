import { payRequest } from '@requestnetwork/payment-processor';
import { getRequestData } from '~/services/requestData';
import { createPayerWaller } from '~/services/payerWallet';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const payerWallet = createPayerWaller();

  const requestData = await getRequestData(id);

  return await payRequest(requestData, payerWallet);
});
