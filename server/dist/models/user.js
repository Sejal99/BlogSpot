"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    salt: {
        type: String,
    },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return;
    }
    const secret = (0, crypto_1.randomBytes)(16).toString();
    const hashedPassword = (0, crypto_1.createHmac)('sha256', secret).update(user.password).digest('hex');
    this.salt = secret;
    this.password = hashedPassword;
    next();
});
userSchema.static('matchPassword', function (email, role, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const secret = user.salt;
        const hashedPassword = user.password;
        const hashingPassword = (0, crypto_1.createHmac)('sha256', secret).update(password).digest('hex');
        if (hashedPassword !== hashingPassword) {
            return null;
        }
    });
});
const user = mongoose_1.default.model('user', userSchema);
exports.default = user;
