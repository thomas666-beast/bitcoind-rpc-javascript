import { BitcoinRPC } from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

const bitcoin = new BitcoinRPC({
    host: process.env.BITCOIN_HOST || 'localhost',
    port: process.env.BITCOIN_PORT || 8332,
    username: process.env.BITCOIN_USERNAME,
    password: process.env.BITCOIN_PASSWORD,
});

async function walletOperations() {
    try {
        console.log('=== Wallet Operations ===\n');

        // Get wallet balance
        const balance = await bitcoin.wallet.getBalance();
        console.log(`Wallet Balance: ${balance.toFixed(8)} BTC\n`);

        // Create new address
        const newAddress = await bitcoin.wallet.getNewAddress('test-label');
        console.log(`New Address: ${newAddress}\n`);

        // Get address info
        const addressInfo = await bitcoin.wallet.getAddressInfo(newAddress);
        console.log('Address Info:', JSON.stringify(addressInfo, null, 2), '\n');

        // List unspent outputs
        const unspent = await bitcoin.wallet.listUnspent();
        console.log(`Unspent Outputs: ${unspent.length}`);
        unspent.slice(0, 3).forEach((utxo, index) => {
            console.log(`  ${index + 1}. ${utxo.txid}:${utxo.vout} - ${utxo.amount} BTC`);
        });

        // List recent transactions
        console.log('\n=== Recent Transactions ===');
        const transactions = await bitcoin.wallet.listTransactions('*', 5);
        transactions.forEach((tx, index) => {
            console.log(`${index + 1}. ${tx.category} - ${tx.amount} BTC - ${tx.txid}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

walletOperations().then();
