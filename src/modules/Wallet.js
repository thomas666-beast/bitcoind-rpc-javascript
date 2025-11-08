export class Wallet {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async getBalance(dummy = '*', minconf = 0, includeWatchonly = true, avoidReuse = false) {
        return await this.rpc.call('getbalance', [dummy, minconf, includeWatchonly, avoidReuse]);
    }

    async getNewAddress(label = '', addressType = '') {
        const params = [];
        if (label) params.push(label);
        if (addressType) params.push(addressType);
        return await this.rpc.call('getnewaddress', params);
    }

    async getAddressesByLabel(label) {
        return await this.rpc.call('getaddressesbylabel', [label]);
    }

    async getAddressInfo(address) {
        return await this.rpc.call('getaddressinfo', [address]);
    }

    async sendToAddress(address, amount, comment = '', commentTo = '', subtractFeeFromAmount = false, replaceable = true, confTarget = 6, estimateMode = 'UNSET') {
        const params = [address, amount];
        if (comment) params.push(comment);
        if (commentTo) params.push(commentTo);
        if (subtractFeeFromAmount) params.push(subtractFeeFromAmount);
        if (replaceable !== undefined) params.push(replaceable);
        if (confTarget) params.push(confTarget);
        if (estimateMode) params.push(estimateMode);

        return await this.rpc.call('sendtoaddress', params);
    }

    async listTransactions(label = '*', count = 10, skip = 0, includeWatchonly = false) {
        return await this.rpc.call('listtransactions', [label, count, skip, includeWatchonly]);
    }

    async getTransaction(txid, includeWatchonly = false) {
        return await this.rpc.call('gettransaction', [txid, includeWatchonly]);
    }

    async listUnspent(minconf = 1, maxconf = 9999999, addresses = [], includeUnsafe = true, queryOptions = null) {
        let params = [minconf, maxconf, addresses, includeUnsafe];

        if (queryOptions) {
            params.push(queryOptions);
        }

        return await this.rpc.call('listunspent', params);
    }

    async walletPassphrase(passphrase, timeout) {
        return await this.rpc.call('walletpassphrase', [passphrase, timeout]);
    }

    async walletLock() {
        return await this.rpc.call('walletlock');
    }

    async walletPassphraseChange(oldPassphrase, newPassphrase) {
        return await this.rpc.call('walletpassphrasechange', [oldPassphrase, newPassphrase]);
    }

    async backupWallet(destination) {
        return await this.rpc.call('backupwallet', [destination]);
    }

    async importAddress(address, label = '', rescan = true, p2sh = false) {
        return await this.rpc.call('importaddress', [address, label, rescan, p2sh]);
    }

    async dumpPrivKey(address) {
        return await this.rpc.call('dumpprivkey', [address]);
    }

    async importPrivKey(privkey, label = '', rescan = true) {
        return await this.rpc.call('importprivkey', [privkey, label, rescan]);
    }
}
