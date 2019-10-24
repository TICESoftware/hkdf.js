import { deriveHKDFKey } from './HKDF';
import { ready as sodiumReady, from_hex, to_hex, crypto_auth_BYTES, crypto_auth_KEYBYTES, crypto_auth } from "libsodium-wrappers";

test('basic',async () => {
    await sodiumReady;
    const ikm = from_hex('AABBCCDDEEFF00112233445566778899');
    const salt = from_hex('00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF');
    const derivedKey = await deriveHKDFKey(ikm, 29, salt, 'Info');

    expect(to_hex(derivedKey)).toBe('dc55d222c0537eb47e4c7b5228cf4f60fe262e3fa3dd9a18e54c7cb6fe');
});
