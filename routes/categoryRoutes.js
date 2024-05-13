import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router();


// routes
// create category
router.post('/create-category',createCategoryController);

//getAll category
router.get('/get-category',categoryController);

//delete category
router.delete('/delete-category/:cat',deleteCategoryController);



export default router;