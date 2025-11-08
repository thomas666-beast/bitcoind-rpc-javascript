export class Util {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async validateAddress(address) {
        return await this.rpc.call('validateaddress', [address]);
    }

    async createMultiSig(nrequired, keys, addressType = null) {
        const params = [nrequired, keys];
        if (addressType) params.push(addressType);

        return await this.rpc.call('createmultisig', params);
    }

    async estimateFee(nblocks) {
        return await this.rpc.call('estimatefee', [nblocks]);
    }

    async estimateSmartFee(conf_target, estimate_mode = 'CONSERVATIVE') {
        return await this.rpc.call('estimatesmartfee', [conf_target, estimate_mode]);
    }

    async signMessageWithPrivKey(privkey, message) {
        return await this.rpc.call('signmessagewithprivkey', [privkey, message]);
    }

    async verifyMessage(address, signature, message) {
        return await this.rpc.call('verifymessage', [address, signature, message]);
    }

    async deriveAddresses(descriptor, range = null) {
        const params = [descriptor];
        if (range) params.push(range);

        return await this.rpc.call('deriveaddresses', params);
    }

    async getDescriptorInfo(descriptor) {
        return await this.rpc.call('getdescriptorinfo', [descriptor]);
    }

    async joinPsbts(psbts) {
        return await this.rpc.call('joinpsbts', psbts);
    }

    async scanTxOutSet(action, scanobjects) {
        return await this.rpc.call('scantxoutset', [action, scanobjects]);
    }
}
