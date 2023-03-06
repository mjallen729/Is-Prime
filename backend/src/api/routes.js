import express from 'express'
import PrimeFind from './is-prime.controller.js'

const router = express.Router();

router.route('/num/:num').get(PrimeFind.checkPrime);
router.route('/num/add').post(PrimeFind.add);

export default router