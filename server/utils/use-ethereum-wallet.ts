import { Wallet } from 'ethers';

export const useEthereumWallet = (account_id: number, wallet_id: number) => {
  const jsonRpcProvider = useJsonRpcProvider();

  const {
    ethereum: { mnemonicPhrase },
  } = useRuntimeConfig();

  const path = `m/44'/60'/${account_id}'/0/${wallet_id}`;

  const wallet = Wallet.fromMnemonic(mnemonicPhrase, path);

  return new Wallet(wallet.privateKey, jsonRpcProvider);
};
