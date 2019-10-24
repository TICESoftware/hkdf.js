declare type Bytes = Uint8Array;
export declare function deriveHKDFKey(ikm: Bytes, L: number, salt?: Bytes, info?: string): Promise<Uint8Array>;
export declare const enum HKDFError {
    invalidSalt = "Salt length must match exactly the key length of the HMAC function.",
    invalidL = "Length of L must not be larger than 255 times the length of the hash output.",
    HMACCalculationFailed = "HMAC calculation failed."
}
export {};
//# sourceMappingURL=HKDF.d.ts.map