export class Generating {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async generate(nblocks, maxtries = 1000000) {
        return await this.rpc.call('generate', [nblocks, maxtries]);
    }

    async generateToAddress(nblocks, address, maxtries = 1000000) {
        return await this.rpc.call('generatetoaddress', [nblocks, address, maxtries]);
    }

    async generateBlock(output, transactions) {
        return await this.rpc.call('generateblock', [output, transactions]);
    }
}
