import { EthereumPrivateKeySignatureProvider } from '@requestnetwork/epk-signature';
import { Types } from '@requestnetwork/request-client.js';

export const createEpkSignatureProvider = () => {
  const runtimeConfig = useRuntimeConfig();

  return new EthereumPrivateKeySignatureProvider({
    method: Types.Signature.METHOD.ECDSA,
    privateKey: runtimeConfig.payeePrivateKey,
  });
};
