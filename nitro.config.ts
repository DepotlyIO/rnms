//https://nitro.unjs.io/config
export default defineNitroConfig({
  noPublicDir: true,
  runtimeConfig: {
    apiToken: '',
    payeePrivateKey: '',
  },
  srcDir: 'server',
});
