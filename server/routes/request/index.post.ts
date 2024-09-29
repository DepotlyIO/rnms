import { Types, Utils } from '@requestnetwork/request-client.js';
import { createRequestClient } from '~/services/requestClient';
import type { CURRENCY } from '@requestnetwork/types/dist/request-logic-types';
import type { ICreateRequestParameters } from '@requestnetwork/types/dist/client-types';

interface requestBody {
  amount: string;
  address: string;
  content: unknown;
  currency: {
    type: CURRENCY;
    value: 'ETH' | string;
  };
}

export default defineEventHandler(async (event) => {
  const body: requestBody = await readBody(event);

  if (!['ETH', 'ERC20'].includes(body.currency.type))
    throw createError({ status: 422, message: `'${body.currency.type}' type not implemented yet` });

  const requestParams =
    body.currency.value === 'ETH'
      ? {
          currencyType: Types.RequestLogic.CURRENCY.ETH,
          paymentNetworkId: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
        }
      : {
          currencyType: Types.RequestLogic.CURRENCY.ERC20,
          paymentNetworkId: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
        };

  const runtimeConfig = useRuntimeConfig();
  const requestClient = createRequestClient();

  const params: ICreateRequestParameters = {
    requestInfo: {
      currency: {
        type: requestParams.currencyType,
        value: body.currency.value,
        network: NETWORK,
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
      id: requestParams.paymentNetworkId,
      parameters: {
        paymentNetworkName: NETWORK,
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
