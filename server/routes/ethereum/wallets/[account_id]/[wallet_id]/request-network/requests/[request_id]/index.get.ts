export default defineEventHandler(async (event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);
  const request_id = getRouterParam(event, 'request_id');

  const wallet = useEthereumWallet(account_id, wallet_id);
  const requestClient = useRequestNetworkClient(wallet.privateKey);

  const request = await requestClient.fromRequestId(request_id);

  return request.getData();
});
