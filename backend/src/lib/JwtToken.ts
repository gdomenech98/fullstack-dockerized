import Crypto from './Crypto';

export default class JwtToken {
    constructor() {

    }

    static getToken( bearerHeader  ) {
        let token = bearerHeader.split('Bearer ')[1]; // Skips the 'Bearer [token]' part
        const decodedData = Crypto.jwtVerify(token);
        return decodedData
    }

}