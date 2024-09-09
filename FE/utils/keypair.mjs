import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export const createWalletAddress = () => {
  const keypair = new Ed25519Keypair();
  const address = keypair.getPublicKey().toSuiAddress();
  return address;
}
