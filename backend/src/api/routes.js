import express from 'express'
import PrimeFind from './is-prime.controller.js'

const router = express.Router();

router.route('/num/:n').get(PrimeFind.checkPrime);

export default router