export class Mining {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async getBlockTemplate(templateRequest = {}) {
        return await this.rpc.call('getblocktemplate', [templateRequest]);
    }

    async getMiningInfo() {
        return await this.rpc.call('getmininginfo');
    }

    async getNetworkHashPS(nblocks = 120, height = null) {
        const params = [nblocks];
        if (height) params.push(height);

        return await this.rpc.call('getnetworkhashps', params);
    }

    async prioritisetransaction(txid, dummy, feeDelta) {
        return await this.rpc.call('prioritisetransaction', [txid, dummy, feeDelta]);
    }

    async submitBlock(hexdata, dummy = null) {
        const params = [hexdata];
        if (dummy) params.push(dummy);

        return await this.rpc.call('submitblock', params);
    }

    async submitHeader(hexdata) {
        return await this.rpc.call('submitheader', [hexdata]);
    }
}
