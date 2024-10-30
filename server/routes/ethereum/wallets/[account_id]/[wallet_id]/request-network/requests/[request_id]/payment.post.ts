import { payRequest } from '@requestnetwork/payment-processor';

export default defineEventHandler(async (event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);
  const request_id = getRouterParam(event, 'request_id');

  const payerWallet = useEthereumWallet(account_id, wallet_id);
  const requestNetworkClient = useRequestNetworkClient(payerWallet.privateKey);

  const request = await requestNetworkClient.fromRequestId(request_id);
  const requestData = request.getData();

  return await payRequest(requestData, payerWallet);
});
