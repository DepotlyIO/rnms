import { providers } from 'ethers';

export const useJsonRpcProvider = () => {
  const runtimeConfig = useRuntimeConfig();

  return new providers.JsonRpcProvider(runtimeConfig.jsonRpcProviderUrl);
};
