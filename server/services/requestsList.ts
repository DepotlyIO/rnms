import { Types } from '@requestnetwork/request-client.js';
import { createRequestClient } from '~/services/requestClient';

export const getRequestsList = async (wallet: string) => {
  const requestClient = createRequestClient();

  const requests = await requestClient.fromIdentity({
    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: wallet,
  });

  return requests.map((request) => request.getData());
};
