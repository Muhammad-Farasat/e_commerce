
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import jwt from 'jsonwebtoken'
import connectToDb from './db/connectToDb.js'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.route.js'
import productRoutes from './Routes/product.route.js'

// const fs = require('fs');

dotenv.config()
connectToDb()


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


const allowedOrigin = ['http://localhost:5173', 'http://localhost:5174']

const corsOrigin = {
  origin: (origin, callback)=>{
    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  credential: true,
}


app.use(cors(corsOrigin));

const __dirname = path.resolve()


app.use(express.static(path.join(__dirname, '/Frontend/dist')))
app.use('/admin', express.static(path.join(__dirname, '/Admin/dist')))

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
})

app.get('/admin/*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'Admin', 'dist', 'index.html'))
})

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: 'upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" })
  }
  
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});


  
app.use(authRoutes)
app.use(productRoutes)
  

  
app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.listen(port, (error) => {
    if (!error) {
      console.log(`Example app listening on port ${port}`);
    } else {
      console.log('This is error!', error);
    }
});