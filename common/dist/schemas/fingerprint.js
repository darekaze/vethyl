"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.FingerprintSchema = new mongoose_1.default.Schema({
    blockStart: { type: Number, index: true },
    blockEnd: { type: Number, index: true },
    fingerprint: String,
    cumulativeFingerprint: String,
    transactionHash: String,
});
//# sourceMappingURL=fingerprint.js.map