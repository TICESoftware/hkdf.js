import { ready as sodiumReady, crypto_auth_BYTES, crypto_auth_KEYBYTES, crypto_auth } from 'libsodium-wrappers';
import { TextEncoder } from 'text-encoding-utf-8';

type Bytes = Uint8Array;

export async function deriveHKDFKey(ikm: Bytes, L: number, salt?: Bytes, info?: string): Promise<Uint8Array> {
    await sodiumReady;

    const hashOutputLength = crypto_auth_BYTES;
    const keyLength = crypto_auth_KEYBYTES;

    if (!salt) {
        salt = new Uint8Array(keyLength);
        salt.fill(0);
    } else if (salt.length != keyLength) {
        throw Error(HKDFError.invalidSalt)
    }

    if (L > 255 * hashOutputLength) {
        throw Error(HKDFError.invalidL);
    }

    // Step 1: Extract
    const prk = crypto_auth(ikm, salt);

    // Step 2: Expand
    const N = Math.ceil(L/hashOutputLength);
    let T = new Uint8Array(N*hashOutputLength);
    const infoBytes = new TextEncoder().encode(info);

    let lastTi = new Uint8Array(hashOutputLength);
    for (let i = 0; i < N; i++) {
        let message: Uint8Array;
        if (i == 0) {
            message = new Uint8Array(infoBytes.length+1);
            message.set(infoBytes);
            message[infoBytes.length] = i;
        } else {
            message = new Uint8Array(hashOutputLength+infoBytes.length+1);
            message.set(lastTi);
            message.set(infoBytes, lastTi.length);
            message[lastTi.length+infoBytes.length] = i;
        }

        let currentTi = crypto_auth(message, prk);
        T.set(currentTi, i*hashOutputLength);
        lastTi = currentTi;
    }

    return new Uint8Array(T.slice(0, L));
}

export const enum HKDFError {
    invalidSalt = 'Salt length must match exactly the key length of the HMAC function.',
    invalidL = 'Length of L must not be larger than 255 times the length of the hash output.',
    HMACCalculationFailed = 'HMAC calculation failed.'
}
