import ErrorResponse from '../lib/ErrorResponse';
import JwtToken from '../lib/JwtToken';

export const authentication = (req: any, res: any, next) => {
    try {
        let token = req.headers['authorization'];
        let decodedData = JwtToken.getToken(token);
        req.auth = decodedData; // The data of the token is stored HERE
        next();
    } catch (e) { //"JsonWebTokenError: invalid token"
        ErrorResponse('Unauthorized', res)
    }
}