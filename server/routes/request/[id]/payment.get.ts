import { getRequestData } from '~/services/requestData';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const requestData = await getRequestData(id);

  // const payed = requestData.expectedAmount >= requestData.balance.balance;

  let payed: 'not' | 'partially' | 'full';

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
