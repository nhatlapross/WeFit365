import { createWalletAddress } from "../../utils/keypair";

const dbName = "wefit365";

export const updateWalletAddressByEmail = async (client:any, emailUser:any) => {
  try {
    const walletAddress = createWalletAddress();
    const result = await client.db(dbName).collection('users').updateOne(
      { email: emailUser},
      { $set: { wallet_address: walletAddress }},
      { upsert: false }
    )

    if (result.matchedCount === 0) {
      throw new Error("User not found");
    }

    return result;
  } catch(err) {
    console.error("Error updating wallet address:", err);
    throw err;
  }
}
