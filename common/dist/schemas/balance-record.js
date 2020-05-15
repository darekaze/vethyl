"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.BalanceRecordSchema = new mongoose_1.default.Schema({
    address: { type: String, index: true },
    time: { type: Date, index: true },
    income: mongoose_1.default.Types.Decimal128,
    expense: mongoose_1.default.Types.Decimal128,
    balance: mongoose_1.default.Types.Decimal128,
});
//# sourceMappingURL=balance-record.js.map