import { createRequestClient } from '~/services/requestClient';

export default defineEventHandler(async (event) => {
  const requestClient = createRequestClient();

  const id = getRouterParam(event, 'id');

  const request = await requestClient.fromRequestId(id);

  return request.getData();
});
