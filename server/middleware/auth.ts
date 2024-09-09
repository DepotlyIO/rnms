export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();

  const { 'x-api-token': token } = event.node.req.headers;

  if (token !== runtimeConfig.apiToken)
    throw createError({ status: 401, message: 'invalid api token' });
});
