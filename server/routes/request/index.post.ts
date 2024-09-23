import { Types, Utils } from '@requestnetwork/request-client.js';
import { createRequestClient } from '~/services/requestClient';
import type { ICreateRequestParameters } from '@requestnetwork/types/dist/client-types';

interface requestBody {
  amount: string;
  address: string;
  content: unknown;
}

export default defineEventHandler(async (event) => {
  const body: requestBody = await readBody(event);

  const runtimeConfig = useRuntimeConfig();
  const requestClient = createRequestClient();

  const params: ICreateRequestParameters = {
    requestInfo: {
      currency: {
        type: Types.RequestLogic.CURRENCY.ERC20,
        value: '0x419Fe9f14Ff3aA22e46ff1d03a73EdF3b70A62ED', // USDT contract
        network: 'sepolia',
      },

      expectedAmount: body.amount,

      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: body.address,
      },

      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: runtimeConfig.payerAddress,
      },

      timestamp: Utils.getCurrentTimestampInSecond(),
    },

    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
      parameters: {
        paymentNetworkName: 'sepolia',
        paymentAddress: body.address,
        feeAddress: FEE_ADDRESS,
        feeAmount: '0',
      },
    },

    contentData: body.content,

    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: runtimeConfig.payerAddress,
    },
  };

  const request = await requestClient.createRequest(params);

  return await request.waitForConfirmation();
});
