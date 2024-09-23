//https://nitro.unjs.io/config
export default defineNitroConfig({
  noPublicDir: true,
  runtimeConfig: {
    apiToken: '',
    jsonRpcProviderUrl: '',
    payerPrivateKey: '',
    payerPublicKey: '',
    payerAddress: '',
  },
  srcDir: 'server',
});
