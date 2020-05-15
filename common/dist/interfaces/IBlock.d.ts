import { Document } from 'mongoose';
export interface IBlock extends Document {
    readonly number: number;
    readonly hash: string;
    readonly parentHash: string;
    readonly nonce: string;
    readonly sha3Uncles: string;
    readonly transactionsRoot: string;
    readonly stateRoot: string;
    readonly receiptsRoot: string;
    readonly miner: string;
    readonly difficulty: string;
    readonly totalDifficulty: string;
    readonly extraData: string;
    readonly size: number;
    readonly gasLimit: number;
    readonly gasUsed: number;
    readonly timestamp: number;
    readonly minedAt: Date;
    readonly transactions: string[];
    readonly uncles: string[];
}
