import { hasSufficientFunds } from '@requestnetwork/payment-processor';

export default defineEventHandler(async (event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);
  const request_id = getRouterParam(event, 'request_id');

  const wallet = useEthereumWallet(account_id, wallet_id);
  const requestClient = useRequestNetworkClient(wallet.privateKey);
  const jsonRpcProvider = useJsonRpcProvider();

  const request = await requestClient.fromRequestId(request_id);
  const requestData = request.getData();

  const has_sufficient_funds = await hasSufficientFunds({
    request: requestData,
    address: wallet.address,
    providerOptions: {
      provider: jsonRpcProvider,
    },
  });

  return {
    has_sufficient_funds,
  };
});
