import { Document, Types } from 'mongoose';
export interface IBalanceState extends Document {
    readonly address: string;
    readonly balance: Types.Decimal128;
    readonly updateAt: Date;
}
