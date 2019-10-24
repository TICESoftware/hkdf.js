"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const libsodium_wrappers_1 = require("libsodium-wrappers");
const text_encoding_utf_8_1 = require("text-encoding-utf-8");
function deriveHKDFKey(ikm, L, salt, info) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers_1.ready;
        const hashOutputLength = libsodium_wrappers_1.crypto_auth_BYTES;
        const keyLength = libsodium_wrappers_1.crypto_auth_KEYBYTES;
        if (!salt) {
            salt = new Uint8Array(keyLength);
            salt.fill(0);
        }
        else if (salt.length != keyLength) {
            throw Error("Salt length must match exactly the key length of the HMAC function." /* invalidSalt */);
        }
        if (L > 255 * hashOutputLength) {
            throw Error("Length of L must not be larger than 255 times the length of the hash output." /* invalidL */);
        }
        // Step 1: Extract
        const prk = libsodium_wrappers_1.crypto_auth(ikm, salt);
        // Step 2: Expand
        const N = Math.ceil(L / hashOutputLength);
        let T = new Uint8Array(N * hashOutputLength);
        const infoBytes = new text_encoding_utf_8_1.TextEncoder().encode(info);
        let lastTi = new Uint8Array(hashOutputLength);
        for (let i = 0; i < N; i++) {
            let message;
            if (i == 0) {
                message = new Uint8Array(infoBytes.length + 1);
                message.set(infoBytes);
                message[infoBytes.length] = i;
            }
            else {
                message = new Uint8Array(hashOutputLength + infoBytes.length + 1);
                message.set(lastTi);
                message.set(infoBytes, lastTi.length);
                message[lastTi.length + infoBytes.length] = i;
            }
            let currentTi = libsodium_wrappers_1.crypto_auth(message, prk);
            T.set(currentTi, i * hashOutputLength);
            lastTi = currentTi;
        }
        return new Uint8Array(T.slice(0, L));
    });
}
exports.deriveHKDFKey = deriveHKDFKey;
//# sourceMappingURL=HKDF.js.map