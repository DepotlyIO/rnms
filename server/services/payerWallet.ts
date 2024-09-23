import { createJsonRpcProvider } from '~/services/jsonRpcProvider';
import { Wallet } from 'ethers';

export const createPayerWaller = () => {
  const runtimeConfig = useRuntimeConfig();
  const jsonRpcProvider = createJsonRpcProvider();

  return new Wallet(runtimeConfig.payerPrivateKey, jsonRpcProvider);
};
