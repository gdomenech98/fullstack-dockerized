import forge from 'node-forge';
import jwt from 'jsonwebtoken'

require('dotenv').config();
export default class Crypto {
    constructor() {

    }
    static generateKeyPair(bits = 2048) {
        // Create a new key pair RSA
        const keyPair = forge.pki.rsa.generateKeyPair({ bits: bits });
        // Convert the key pair to PEM format
        const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
        const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
        return { privateKeyPem, publicKeyPem }
    }

    static sign(data, privateKeyPem) {
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);  
        const md = forge.md.sha256.create();
        md.update(data, 'utf8');
        const signature = privateKey.sign(md);
        return signature;
    }

    static verify(signature, data, publicKeyPem) {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const md = forge.md.sha256.create();
        md.update(data, 'utf8');
        const verified = publicKey.verify(md.digest().bytes(), signature);
        return verified
    }

    static jwtSign = (data: any, expiration?: any) => {
        const secret = process.env.JWT_SECRET
        return jwt.sign(data, secret, { expiresIn: expiration ?? '1y' });
    }

    static jwtVerify(token: string) {
        const secret = process.env.JWT_SECRET
        const decodedData = jwt.verify(token, secret);
        if (!token) throw 'Unauthorized'
        return decodedData
    }
}