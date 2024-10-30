import { RequestNetwork } from '@requestnetwork/request-client.js';

export const useRequestNetworkClient = (privateKey?: string) => {
  const {
    requestNetwork: { nodeUrl },
  } = useRuntimeConfig();

  const signatureProvider = privateKey ? useEpkSignatureProvider(privateKey) : undefined;

  return new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: nodeUrl,
    },
    signatureProvider,
  });
};
