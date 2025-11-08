import { BitcoinRPC } from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

const bitcoin = new BitcoinRPC({
    host: process.env.BITCOIN_HOST || '127.0.0.1',
    port: process.env.BITCOIN_PORT || 18443,
    username: process.env.BITCOIN_USERNAME || 'rpc_user',
    password: process.env.BITCOIN_PASSWORD || 'rpc_password',
    ssl: process.env.BITCOIN_SSL === 'true' || false,
    timeout: parseInt(process.env.BITCOIN_TIMEOUT) || 30000
});

async function main() {
    try {
        console.log('=== Bitcoin Node Info ===');

        // Get MemoryInfo
        const memoryInfo = await bitcoin.control.getMemoryInfo();
        console.log('MemoryInfo:');
        console.log(memoryInfo);

        // Get blockchain info
        const blockchainInfo = await bitcoin.blockchain.getBlockchainInfo();
        console.log(`Chain: ${blockchainInfo.chain}`);
        console.log(`Blocks: ${blockchainInfo.blocks}`);
        console.log(`Headers: ${blockchainInfo.headers}`);
        console.log(`Best Block Hash: ${blockchainInfo.bestblockhash}`);
        console.log(`Difficulty: ${blockchainInfo.difficulty.toFixed(2)}`);
        console.log(`Size on disk: ${Math.round(blockchainInfo.size_on_disk / 1024 / 1024)} MB`);

        // Get network info
        console.log('\n=== Network Info ===');
        const networkInfo = await bitcoin.network.getNetworkInfo();
        console.log(`Version: ${networkInfo.version}`);
        console.log(`Subversion: ${networkInfo.subversion}`);
        console.log(`Connections: ${await bitcoin.network.getConnectionCount()}`);

        // Get mining info
        console.log('\n=== Mining Info ===');
        const miningInfo = await bitcoin.mining.getMiningInfo();
        console.log(`Network HashPS: ${await bitcoin.mining.getNetworkHashPS()}`);

        // Try to get wallet info
        try {
            bitcoin.setPath('/wallet/james');
            const balance = await bitcoin.wallet.getBalance();
            console.log(`\n=== Wallet Info ===`);
            console.log(`Balance: ${balance.toFixed(8)} BTC`);

            const unspent = await bitcoin.wallet.listUnspent();
            console.log(`Unspent outputs: ${unspent.length}`);
        } catch (walletError) {
            console.log('\n=== Wallet Info ===');
            console.log(walletError);
            console.log('Wallet not enabled or available');
        }
    } catch (error) {
        console.error('Error:', error.message);
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure Bitcoin Core is running');
        console.log('2. Check your bitcoin.conf file has RPC enabled:');
        console.log('   server=1');
        console.log('   rpcuser=your_username');
        console.log('   rpcpassword=your_password');
        console.log('   rpcport=18443');
        console.log('3. Verify the RPC credentials in .env file');
        console.log('4. Check if Bitcoin Core is still syncing');
    }
}

main().then();
