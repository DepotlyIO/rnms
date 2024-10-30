import { Contract, utils } from 'ethers';
import type { ERC20TokenParams } from '~/utils/constants';

export default eventHandler(async (event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);

  const runtimeConfig = useRuntimeConfig();
  const networkTokens = AVAILABLE_ERC20_TOKENS[runtimeConfig.ethereum.network];
  const jsonRpcProvider = useJsonRpcProvider();
  const wallet = useEthereumWallet(account_id, wallet_id);

  const balances = await Promise.all([
    jsonRpcProvider.getBalance(wallet.address).then((balance) => ({
      type: 'cryptocurrency',
      name: 'Ethereum',
      currency_code: 'ETH',
      decimals: 18,
      balance: utils.formatEther(balance),
    })),
    ...Object.entries<ERC20TokenParams>(networkTokens).map(async (pair) => {
      const [, params] = pair;
      const contract = new Contract(params.contract.address, params.contract.abi, jsonRpcProvider);
      const amount = await contract.balanceOf(wallet.address);

      const balance = utils.formatUnits(amount, params.contract.decimals);

      return {
        type: 'token',
        name: params.name,
        currency_code: params.currency_code,
        decimals: params.contract.decimals,
        balance,
      };
    }),
  ]);

  return {
    account_id,
    wallet_id,
    address: wallet.address,
    balances,
  };
});
