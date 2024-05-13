import express from 'express';
import { createMemoController, getOneMemoController } from '../controllers/memoController.js';

const router = express.Router();


// routes
// create memo
router.post('/create-memo/:cus',createMemoController);

//get one memo
router.get('/get-one-memo/:mid',getOneMemoController);


export default router;