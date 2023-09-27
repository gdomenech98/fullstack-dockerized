import express from 'express'

const router = express.Router();
router.get('/api/v1/test/', (req, res) => {
    res.send('HELLO FROM TEST!')
}
)

export default router 