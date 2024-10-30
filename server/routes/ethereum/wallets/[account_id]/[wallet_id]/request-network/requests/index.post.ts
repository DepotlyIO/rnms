import { Types, Utils } from '@requestnetwork/request-client.js';
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
  const { account_id, wallet_id } = useEthereumWalletPathData(event);
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
  const wallet = useEthereumWallet(account_id, wallet_id);
  const requestNetworkClient = useRequestNetworkClient(wallet.privateKey);

  const params: ICreateRequestParameters = {
    requestInfo: {
      currency: {
        type: requestParams.currencyType,
        value: body.currency.value,
        network: runtimeConfig.ethereum.network,
      },

      expectedAmount: body.amount,

      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: body.address,
      },

      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: wallet.address,
      },

      timestamp: Utils.getCurrentTimestampInSecond(),
    },

    // @ts-expect-error I dunno, but it's working
    paymentNetwork: {
      id: requestParams.paymentNetworkId,
      parameters: {
        paymentNetworkName: runtimeConfig.ethereum.network,
        paymentAddress: body.address,
        feeAddress: runtimeConfig.ethereum.feeAddress,
        feeAmount: '0',
      },
    },

    contentData: body.content,

    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: wallet.address,
    },
  };

  const request = await requestNetworkClient.createRequest(params);

  return request.getData();
});
