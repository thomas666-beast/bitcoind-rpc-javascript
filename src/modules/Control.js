export class Control {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async getBlockchainInfo() {
        return await this.rpc.call('getblockchaininfo');
    }

    async getNetworkInfo() {
        return await this.rpc.call('getnetworkinfo');
    }

    async getMiningInfo() {
        return await this.rpc.call('getmininginfo');
    }

    async getMemoryInfo() {
        return await this.rpc.call('getmemoryinfo');
    }

    async getRpcInfo() {
        return await this.rpc.call('getrpcinfo');
    }

    async uptime() {
        return await this.rpc.call('uptime');
    }

    async help(command = '') {
        return await this.rpc.call('help', command ? [command] : []);
    }

    async stop() {
        return await this.rpc.call('stop');
    }

    async logLevel(level) {
        return await this.rpc.call('loglevel', [level]);
    }
}
