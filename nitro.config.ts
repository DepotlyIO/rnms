//https://nitro.unjs.io/config
export default defineNitroConfig({
  noPublicDir: true,
  runtimeConfig: {
    apiToken: '',
    payeePrivateKey: '',
    payeePublicKey: '',
    payeeAddress: '',
  },
  srcDir: 'server',
});
