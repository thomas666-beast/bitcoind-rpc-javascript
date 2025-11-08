export class RawTransactions {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async createRawTransaction(inputs, outputs, locktime = 0, replaceable = false) {
        const params = [inputs, outputs];
        if (locktime) params.push(locktime);
        if (replaceable) params.push(replaceable);

        return await this.rpc.call('createrawtransaction', params);
    }

    async decodeRawTransaction(hexstring, iswitness = true) {
        return await this.rpc.call('decoderawtransaction', [hexstring, iswitness]);
    }

    async signRawTransactionWithWallet(hexstring, prevtxs = null, sighashtype = 'ALL') {
        const params = [hexstring];
        if (prevtxs) params.push(prevtxs);
        params.push(sighashtype);

        return await this.rpc.call('signrawtransactionwithwallet', params);
    }

    async sendRawTransaction(hexstring, maxfeerate = 0) {
        return await this.rpc.call('sendrawtransaction', [hexstring, maxfeerate]);
    }

    async getRawTransaction(txid, verbose = true, blockhash = null) {
        const params = [txid, verbose];
        if (blockhash) params.push(blockhash);

        return await this.rpc.call('getrawtransaction', params);
    }

    async analyzePsbt(psbt) {
        return await this.rpc.call('analyzepsbt', [psbt]);
    }

    async combinePsbt(psbts) {
        return await this.rpc.call('combinepsbt', psbts);
    }

    async createPsbt(inputs, outputs, locktime = 0, replaceable = false) {
        const params = [inputs, outputs];
        if (locktime) params.push(locktime);
        if (replaceable) params.push(replaceable);

        return await this.rpc.call('createpsbt', params);
    }

    async walletProcessPsbt(psbt, sign = true, sighashtype = 'ALL', bip32derivs = false) {
        return await this.rpc.call('walletprocesspsbt', [psbt, sign, sighashtype, bip32derivs]);
    }

    async finalizePsbt(psbt, extract = true) {
        return await this.rpc.call('finalizepsbt', [psbt, extract]);
    }

    async joinPsbts(psbts) {
        return await this.rpc.call('joinpsbts', psbts);
    }

    async utxoUpdatePsbt(psbt, descriptors = []) {
        const params = [psbt];
        if (descriptors.length > 0) params.push(descriptors);

        return await this.rpc.call('utxoupdatepsbt', params);
    }
}
