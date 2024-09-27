import express from 'express';
import { AptosClient, AptosAccount, FaucetClient, HexString, Types } from 'aptos';

const app = express();
const port = 3003;

// Configure the client to use the devnet network
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

app.use(express.json());

//create challenge
app.post('/challenge', async (req, res) => {
  try {
    const { privateKey, contractAddress, moduleName, functionName, args } = req.body;

    // Create an account instance from the private key
    const account = new AptosAccount(HexString.ensure(privateKey).toUint8Array());

    // Create the payload for the transaction
    const payload: Types.TransactionPayload = {
      type: 'entry_function_payload',
      function: `${contractAddress}::${moduleName}::${functionName}`,
      type_arguments: [],
      arguments: args
    };

    // Create and sign the transaction
    const rawTxn = await client.generateTransaction(account.address(), payload);
    const signedTxn = await client.signTransaction(account, rawTxn);

    // Submit the transaction
    const transactionRes = await client.submitTransaction(signedTxn);

    // Wait for the transaction to be confirmed
    const txnResult = await client.waitForTransactionWithResult(transactionRes.hash);

    res.json({ success: true, result: txnResult });

  } catch (error) {    
    res.status(500).json({ success: false, error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});