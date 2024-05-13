import express from 'express';
import { createProductController, deleteProductController, getAllProductController, getOneCatProductController, getOneProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();


//routes
router.post('/create-product', formidable(),createProductController);

//getAll product
router.get('/get-all-products',getAllProductController);

//get one cat product
router.get('/get-one-cat-prod/:cat',getOneCatProductController);

//get one product
router.get('/get-one-prod/:pid',getOneProductController);

//delete product
router.delete('/delete-product/:pid',deleteProductController);

//update product
router.put('/update-product/:pid',formidable(),updateProductController);

//get photo
// router.get('/product-photo/:pid',productPhotoController);





export default router