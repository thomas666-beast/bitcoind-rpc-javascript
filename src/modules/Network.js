export class Network {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async getNetworkInfo() {
        return await this.rpc.call('getnetworkinfo');
    }

    async getConnectionCount() {
        return await this.rpc.call('getconnectioncount');
    }

    async ping() {
        return await this.rpc.call('ping');
    }

    async getPeerInfo() {
        return await this.rpc.call('getpeerinfo');
    }

    async addNode(node, command) {
        return await this.rpc.call('addnode', [node, command]);
    }

    async disconnectNode(address = null, nodeid = null) {
        const params = [];
        if (address) params.push(address);
        if (nodeid) params.push(nodeid);

        return await this.rpc.call('disconnectnode', params);
    }

    async getAddedNodeInfo(node = null) {
        return await this.rpc.call('getaddednodeinfo', node ? [node] : []);
    }

    async getNodeAddresses(count = 1) {
        return await this.rpc.call('getnodeaddresses', [count]);
    }

    async setNetworkActive(state) {
        return await this.rpc.call('setnetworkactive', [state]);
    }
}
