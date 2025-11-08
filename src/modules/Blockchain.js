export class Blockchain {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async getBlockchainInfo() {
        return await this.rpc.call('getblockchaininfo');
    }

    async getBlockCount() {
        return await this.rpc.call('getblockcount');
    }

    async getBlockHash(height) {
        return await this.rpc.call('getblockhash', [height]);
    }

    async getBlock(blockhash, verbosity = 1) {
        return await this.rpc.call('getblock', [blockhash, verbosity]);
    }

    async getBlockHeader(blockhash, verbose = true) {
        return await this.rpc.call('getblockheader', [blockhash, verbose]);
    }

    async getChainTips() {
        return await this.rpc.call('getchaintips');
    }

    async getDifficulty() {
        return await this.rpc.call('getdifficulty');
    }

    async getMempoolInfo() {
        return await this.rpc.call('getmempoolinfo');
    }

    async getMempoolAncestors(txid, verbose = false) {
        return await this.rpc.call('getmempoolancestors', [txid, verbose]);
    }

    async getMempoolDescendants(txid, verbose = false) {
        return await this.rpc.call('getmempooldescendants', [txid, verbose]);
    }

    async getMempoolEntry(txid) {
        return await this.rpc.call('getmempoolentry', [txid]);
    }

    async getRawMempool(verbose = false) {
        return await this.rpc.call('getrawmempool', [verbose]);
    }

    async getTxOut(txid, n, includeMempool = true) {
        return await this.rpc.call('gettxout', [txid, n, includeMempool]);
    }

    async getTxOutProof(txids, blockhash = null) {
        const params = [txids];
        if (blockhash) params.push(blockhash);

        return await this.rpc.call('gettxoutproof', params);
    }

    async getTxOutSetInfo() {
        return await this.rpc.call('gettxoutsetinfo');
    }

    async verifyChain(checklevel = 3, nblocks = 6) {
        return await this.rpc.call('verifychain', [checklevel, nblocks]);
    }

    async verifyTxOutProof(proof) {
        return await this.rpc.call('verifytxoutproof', [proof]);
    }

    async getBlockStats(hashOrHeight, stats = null) {
        const params = [hashOrHeight];
        if (stats) params.push(stats);

        return await this.rpc.call('getblockstats', params);
    }
}
