import { Document } from 'mongoose';
export interface ITransaction extends Document {
    readonly hash: string;
    readonly blockHash: string;
    readonly blockNumber: number;
    readonly doneAt: Date;
    readonly from: string;
    readonly to: string | null;
    readonly value: string;
    readonly gas: number;
    readonly gasPrice: string;
    readonly gasUsed: number;
    readonly nonce: number;
    readonly transactionIndex: number | null;
    readonly input: string;
    readonly status?: boolean;
    readonly contractAddress?: string;
}
