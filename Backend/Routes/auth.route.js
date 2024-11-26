import express from 'express'
import {login, signup, adminLogin} from '../Controller/auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
  
router.post('/login', login)

router.post('/admin/adminLogin', adminLogin)

export default router