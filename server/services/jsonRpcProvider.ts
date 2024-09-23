import { providers } from 'ethers';

export const createJsonRpcProvider = () => {
  const runtimeConfig = useRuntimeConfig();

  return new providers.JsonRpcProvider(runtimeConfig.jsonRpcProviderUrl);
};
