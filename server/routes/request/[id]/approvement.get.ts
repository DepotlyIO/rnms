import { hasErc20Approval } from '@requestnetwork/payment-processor';
import { createJsonRpcProvider } from '~/services/jsonRpcProvider';
import { getRequestData } from '~/services/requestData';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const runtimeConfig = useRuntimeConfig();
  const jsonRpcProvider = createJsonRpcProvider();

  const requestData = await getRequestData(id);

  const approved = await hasErc20Approval(requestData, runtimeConfig.payerAddress, jsonRpcProvider);

  return {
    approved,
  };
});
