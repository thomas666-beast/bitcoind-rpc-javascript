import fetch from 'node-fetch';
import {Control} from "./modules/Control.js";
import {Wallet} from "./modules/Wallet.js";
import {RawTransactions} from "./modules/RawTransactions.js";
import {Blockchain} from "./modules/Blockchain.js";
import {Mining} from "./modules/Mining.js";
import {Network} from "./modules/Network.js";
import {Generating} from "./modules/Generating.js";
import {Util} from "./modules/Util.js";

export class BitcoinRPC {
    constructor(config = {}) {
        this.config = {
            host: config.host || 'localhost',
            port: config.port || 8332,
            username: config.username || '',
            password: config.password || '',
            path: config.path || '',
            ssl: config.ssl || false,
            timeout: config.timeout || 30000,
            ...config
        };

        this.protocol = this.config.ssl ? 'https' : 'http';
        this.path = this.config.path;

        this.url = '' === this.path
            ? `${this.protocol}://${this.config.host}:${this.config.port}`
            : `${this.protocol}://${this.config.host}:${this.config.port}${this.path}`;

        // Initialize modules
        this.control = new Control(this);
        this.wallet = new Wallet(this);
        this.rawTransactions = new RawTransactions(this);
        this.blockchain = new Blockchain(this);
        this.mining = new Mining(this);
        this.network = new Network(this);
        this.generating = new Generating(this);
        this.util = new Util(this);
    }

    async call(method, params = []) {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64')
            },
            body: JSON.stringify({
                jsonrpc: '1.0',
                id: 'bitcoin-js',
                method: method,
                params: params
            }),
            timeout: this.config.timeout
        };

        try {
            const response = await fetch(this.url, request);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(`Bitcoin RPC Error: ${data.error.message} (code: ${data.error.code})`);
            }

            return data.result;
        } catch (error) {
            if (error.name === 'FetchError' && error.code === 'ECONNREFUSED') {
                throw new Error(`Cannot connect to Bitcoin node at ${this.url}. Make sure Bitcoin Core is running and RPC is enabled.`);
            }
            throw error;
        }
    }

    setPath(path) {
        if ('' !== path) {
            this.url = `${this.url}${path}`;
        }
    }
}
