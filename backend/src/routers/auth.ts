import express from 'express'
import User from '../models/User';
import MongoDB from '../lib/MongoDB';
import Crypto from '../lib/Crypto'
import ErrorResponse from '../lib/ErrorResponse';
import Mailgun from '../lib/Mailgun';

require('dotenv').config();
const router = express.Router();

router.post('/api/v1/users/login', async (req, res) => {
    const data = req.body
    const email = data.email.toLowerCase()
    try {
        const user = await MongoDB.readOne('users', { email: email });
        const hash = user.password
        await User.validatePassword(data.password, hash)
        // Obtain Token
        const dataToSign = { "email": user.email, "type": user.type, "status": user.status }
        const jwtToken = Crypto.jwtSign(dataToSign);
        const responseBody = {
            "email": user.email,
            "token": jwtToken,
            "type": user.type,
            "status": user.status
        }
        res.send(responseBody);
    } catch (e) {
        ErrorResponse(e, res)
    }
});

router.post('/api/v1/users/register', async (req, res) => {
    const payload = req.body;
    const email = payload.email.toLowerCase();
    const password = payload.password;
    try {
        const hash = await User.generateHash(password);
        const user = await MongoDB.create('users', { email, password: hash, type: "user", status: "confirmed" });
        // Obtain Token
        const dataToSign = { "email": user.email, "type": user.type, "status": user.status }
        const jwtToken = Crypto.jwtSign(dataToSign);
        const responseBody = {
            "email": user.email,
            "token": jwtToken,
            "type": user.type,
            "status": user.status
        }
        res.send(responseBody);
    } catch (e) {
        ErrorResponse(e, res)
    }
});

router.post('/api/v1/users/forgotpassword', async (req, res) => {
    const payload = req.body;
    const email = payload.email.toLowerCase();
    try {
        const user = await MongoDB.readOne('users', { email });
        const dataToSign = { "email": user.email, "type": "recover" }
        const jwtToken = Crypto.jwtSign(dataToSign, '10m');// Obtain Token
        const recoverUrl = `${process.env.SERVER_URL}/changepassword?token=${jwtToken}`
        await Mailgun.sendRecoverEmail('support@sixedge.es', user.email, recoverUrl) // Send recover email
        res.send({});
    } catch (e) {
        ErrorResponse(e, res)
    }
});

router.post('/api/v1/users/changepassword', async (req:any, res:any) => {
    const payload = req.body;
    const newPassword = payload.password;
    try {
        const jwtToken = req?.query?.token
        const decodedData:any = Crypto.jwtVerify(jwtToken)
        if (!decodedData) throw 'Server error'
        const oldUser = await MongoDB.readOne('users', { email: decodedData?.email });
        const newPasswordHash = await User.generateHash(newPassword);
        const newUser = {
            ...oldUser,
            password: newPasswordHash
        }
        await MongoDB.update('users', { _id: newUser._id }, newUser)
        res.send({});
    } catch (e) {
        ErrorResponse(e, res)
    }
});

router.post('/api/v1/users/sociallogin/google', async (req, res) => { // Google Social login
    const payload = req.body;
    try {
    } catch (e) {
        ErrorResponse(e, res)
    }
});

export default router 