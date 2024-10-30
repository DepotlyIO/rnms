export default eventHandler((event) => {
  const { account_id, wallet_id } = useEthereumWalletPathData(event);

  const wallet = useEthereumWallet(account_id, wallet_id);

  return {
    account_id,
    wallet_id,
    wallet: {
      address: wallet.address,
      public_key: wallet.publicKey,
    },
  };
});
