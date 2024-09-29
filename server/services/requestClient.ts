import { RequestNetwork } from '@requestnetwork/request-client.js';
import { createEpkSignatureProvider } from '~/services/epkSignatureProvider';

export const createRequestClient = () =>
  new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: REQUEST_NETWORK_NODE,
    },
    signatureProvider: createEpkSignatureProvider(),
  });
