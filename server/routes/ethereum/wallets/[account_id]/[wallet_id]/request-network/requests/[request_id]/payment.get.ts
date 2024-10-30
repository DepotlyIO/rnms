export default defineEventHandler(async (event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);
  const request_id = getRouterParam(event, 'request_id');

  const wallet = useEthereumWallet(account_id, wallet_id);
  const requestNetworkClient = useRequestNetworkClient(wallet.privateKey);

  const request = await requestNetworkClient.fromRequestId(request_id);
  const requestData = request.getData();

  let payed: 'not' | 'partially' | 'full';

  console.log(requestData);

  switch (true) {
    case requestData.balance.balance === '0':
      payed = 'not';
      break;
    case BigInt(requestData.balance.balance) < BigInt(requestData.expectedAmount):
      payed = 'partially';
      break;
    default:
      payed = 'full';
  }

  return {
    payed,
  };
});
