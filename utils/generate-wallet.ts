import { Wallet } from 'ethers';

const generateEthereumKeyPair = () => {
  const wallet = Wallet.createRandom();

  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
  };
};

console.log(generateEthereumKeyPair());
