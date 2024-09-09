export default defineEventHandler((event) => {
  event.node.res.statusCode = 404;

  return { error: 'route not found', status: 404 };
});
