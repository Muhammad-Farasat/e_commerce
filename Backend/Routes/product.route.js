import express from 'express'
import {allproduct, removeProduct, updateproduct, addProduct, newCollection, popularWomen, addtocart, getCart, removefromcart} from '../Controller/product.controller.js'
import FetchUser from '../Middleware/FetchUser.js'

const router = express.Router()

router.get('/allproduct', allproduct)
  
router.post('/removeProduct', removeProduct)
  
router.put('/updateproduct', updateproduct)
  
router.post('/addProduct', addProduct)
  
router.get('/newCollection', newCollection)
  
router.get('/popularWomen', popularWomen)

router.post('/addtocart', FetchUser, addtocart)

router.post('/removefromcart', FetchUser, removefromcart)

router.post('/getCart', FetchUser, getCart)

export default router
  