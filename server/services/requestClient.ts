import { RequestNetwork } from '@requestnetwork/request-client.js';
import { createEpkSignatureProvider } from '~/services/epkSignatureProvider';

export const createRequestClient = () =>
  new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: 'https://sepolia.gateway.request.network/',
    },
    signatureProvider: createEpkSignatureProvider(),
  });
