import { EthereumPrivateKeySignatureProvider } from '@requestnetwork/epk-signature';
import { Types } from '@requestnetwork/request-client.js';

export const createEpkSignatureProvider = () =>
  new EthereumPrivateKeySignatureProvider({
    method: Types.Signature.METHOD.ECDSA,
    privateKey: process.env.PAYEE_PRIVATE_KEY,
  });
