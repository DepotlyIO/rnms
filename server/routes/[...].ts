export default defineEventHandler(() => {
  throw createError({ status: 404, message: 'route not found' });
});
