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
const HKDF_1 = require("./HKDF");
const libsodium_wrappers_1 = require("libsodium-wrappers");
test('basic', () => __awaiter(this, void 0, void 0, function* () {
    yield libsodium_wrappers_1.ready;
    const ikm = libsodium_wrappers_1.from_hex('AABBCCDDEEFF00112233445566778899');
    const salt = libsodium_wrappers_1.from_hex('00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF');
    const derivedKey = yield HKDF_1.deriveHKDFKey(ikm, 29, salt, 'Info');
    expect(libsodium_wrappers_1.to_hex(derivedKey)).toBe('dc55d222c0537eb47e4c7b5228cf4f60fe262e3fa3dd9a18e54c7cb6fe');
}));
//# sourceMappingURL=HKDF.test.js.map