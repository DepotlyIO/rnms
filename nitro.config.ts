//https://nitro.unjs.io/config
export default defineNitroConfig({
  noPublicDir: true,
  runtimeConfig: {
    apiToken: '',
    jsonRpcProviderUrl: '',
    ethereum: {
      network: '',
      feeAddress: '',
      mnemonicPhrase: '',
    },
    requestNetwork: {
      nodeUrl: '',
    },
  },
  srcDir: 'server',
});
