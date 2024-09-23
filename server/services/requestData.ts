import { createRequestClient } from '~/services/requestClient';

export const getRequestData = async (requestId: string) => {
  const requestClient = createRequestClient();

  const request = await requestClient.fromRequestId(requestId);

  return request.getData();
};
