import express from 'express'
import profileRouter from './profile'
import authRouter from './auth'
import testRouter from './test'


const router = express.Router()

router.use('/', profileRouter);  
router.use('/', authRouter); 
router.use('/', testRouter); 


export default router 