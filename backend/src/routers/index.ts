import express from 'express'
import profileRouter from './profile'
import authRouter from './auth'

const router = express.Router()

router.use('/', profileRouter);  
router.use('/', authRouter); 

export default router 