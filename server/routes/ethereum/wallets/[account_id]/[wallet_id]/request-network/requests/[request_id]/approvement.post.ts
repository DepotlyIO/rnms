import { approveErc20, hasErc20Approval } from '@requestnetwork/payment-processor';

export default defineEventHandler(async (event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);
  const request_id = getRouterParam(event, 'request_id');

  const wallet = useEthereumWallet(account_id, wallet_id);
  const requestNetworkClient = useRequestNetworkClient();
  const jsonRpcProvider = useJsonRpcProvider();

  const request = await requestNetworkClient.fromRequestId(request_id);
  const requestData = request.getData();

  const approved = await hasErc20Approval(requestData, wallet.address, jsonRpcProvider);

  if (!approved) {
    approveErc20(requestData, wallet);
  }

  return {
    approved,
  };
});
