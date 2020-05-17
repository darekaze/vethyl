"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.BlockSchema = new mongoose_1.default.Schema({
    number: { type: Number, index: true },
    hash: { type: String, unique: true, index: true },
    parentHash: String,
    nonce: String,
    sha3Uncles: String,
    transactionsRoot: String,
    stateRoot: String,
    receiptsRoot: String,
    miner: { type: String, index: true },
    difficulty: String,
    totalDifficulty: String,
    extraData: String,
    size: Number,
    gasLimit: Number,
    gasUsed: Number,
    timestamp: Number,
    minedAt: { type: Date, index: true },
    transactions: [String],
    uncles: [String],
});
//# sourceMappingURL=block.js.map