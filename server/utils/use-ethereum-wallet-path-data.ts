import { EventHandlerRequest, H3Event } from 'h3';

export const useEthereumWalletPathData = (event: H3Event<EventHandlerRequest>) => {
  const account_id = +getRouterParam(event, 'account_id');
  const wallet_id = +getRouterParam(event, 'wallet_id');

  if (![account_id, wallet_id].every((value) => Number.isSafeInteger(value)))
    throw createError({
      status: 400,
      message: '`account_id` and `wallet_id` must be safe integers',
    });

  return {
    account_id,
    wallet_id,
  };
};
