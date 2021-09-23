# HKDF

HMAC-based Extract-and-Expand Key Derivation Function (HKDF) as defined in <a href="https://tools.ietf.org/html/rfc5869">RFC 5869</a>.
The HMAC is provided by libsodium which uses the HMAC-SHA-512/256 algorithm.

## Installation

```bash
$ npm i --save sodium-hkdf
or
$ yarn add sodium-hkdf
```

## Usage
For deriving a new key of length 32 bytes from some input keying material `ikm`:

```typescript
const hkdfKey = deriveHKDFKey(ikm, 32);
```

A `salt` and some application specific info string (which is hashed into the HMAC) can additionally be provided:

```typescript
const salt = new Uint8Array(32).fill(0);
const hkdfKey = deriveHKDFKey(input, 32, salt, "info");
```
