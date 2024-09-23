import { approveErc20, hasErc20Approval } from '@requestnetwork/payment-processor';
import { createJsonRpcProvider } from '~/services/jsonRpcProvider';
import { createPayerWaller } from '~/services/payerWallet';
import { getRequestData } from '~/services/requestData';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const runtimeConfig = useRuntimeConfig();
  const jsonRpcProvider = createJsonRpcProvider();
  const payerWallet = createPayerWaller();

  const requestData = await getRequestData(id);

  const approved = await hasErc20Approval(requestData, runtimeConfig.payerAddress, jsonRpcProvider);

  if (!approved) {
    approveErc20(requestData, payerWallet);
  }

  return {
    approved,
  };
});
