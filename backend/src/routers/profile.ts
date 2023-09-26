import express from 'express'
import MongoDB from '../lib/MongoDB';
import ErrorResponse from '../lib/ErrorResponse';
import { authentication } from '../middleware/authentication';

const router = express.Router();

router.get('/api/v1/profiles/', async (req: any, res) => { // LIST
    try {
        const dbquery = {}
        const data = await MongoDB.read('profiles', dbquery);
        res.send(data)
    } catch (e: any) {
        ErrorResponse(e, res)
    }
})

router.get('/api/v1/profiles/:id', authentication,
    async (req: any, res) => { // READ ONE
        const isMyProfile = req.params.id == 'me'
        const email = req.auth.email
        try {
            const dbquery = isMyProfile ? { email: email } : { _id: req.params.id }
            const data = await MongoDB.readOne('profiles', dbquery);
            res.send(data)
        } catch (e: any) {
            ErrorResponse(e, res)
        }
    }
)

router.post('/api/v1/profiles/', authentication, async (req: any, res) => { // CREATE
    try {
        const payload = req.body
        const data = await MongoDB.create('profiles', payload);
        res.send(data)
    } catch (e: any) {
        ErrorResponse(e, res)
    }
})

router.post('/api/v1/profiles/:id', async (req: any, res) => {
    try {
        const payload = req.body
        const dbquery = { _id: req.params.id }
        const data = await MongoDB.update('profiles', dbquery, payload);
        res.send(data)
    } catch (e: any) {
        ErrorResponse(e, res)
    }
})

router.get('/api/v1/profiles/:id/delete', async (req: any, res) => {
    try {
        const dbquery = { _id: req.params.id }
        const data = await MongoDB.delete('profiles', dbquery);
        res.send(data)
    } catch (e: any) {
        ErrorResponse(e, res)
    }
})

router.get('/api/v1/profiles/:id/recover', async (req: any, res) => {
    try {
        const dbquery = { _id: req.params.id }
        const data = await MongoDB.recover('profiles', dbquery);
        res.send(data)
    } catch (e: any) {
        ErrorResponse(e, res)
    }
})
export default router 