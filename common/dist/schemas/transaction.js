"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.TransactionSchema = new mongoose_1.default.Schema({
    hash: { type: String, unique: true, index: true },
    blockHash: { type: String, index: true },
    blockNumber: { type: Number, index: true },
    doneAt: { type: Date, index: true },
    from: { type: String, index: true },
    to: { type: String, index: true },
    value: String,
    gas: Number,
    gasPrice: String,
    gasUsed: Number,
    nonce: Number,
    transactionIndex: Number,
    input: String,
    status: Boolean,
    contractAddress: String,
});
//# sourceMappingURL=transaction.js.map