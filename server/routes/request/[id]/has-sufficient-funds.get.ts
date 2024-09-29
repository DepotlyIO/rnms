import { hasSufficientFunds } from '@requestnetwork/payment-processor';
import { createRequestClient } from '~/services/requestClient';
import { createJsonRpcProvider } from '~/services/jsonRpcProvider';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const runtimeConfig = useRuntimeConfig();
  const requestClient = createRequestClient();
  const jsonRpcProvider = createJsonRpcProvider();

  const requestData = await requestClient.fromRequestId(id);

  const has_sufficient_funds = await hasSufficientFunds({
    request: requestData.getData(),
    address: runtimeConfig.payerAddress,
    providerOptions: {
      provider: jsonRpcProvider,
    },
  });

  return {
    has_sufficient_funds,
  };
});
