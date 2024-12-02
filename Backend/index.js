import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import jwt from 'jsonwebtoken'
import connectToDb from './db/connectToDb.js'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.route.js'
import productRoutes from './Routes/product.route.js'
import { v2 as cloudinary } from 'cloudinary';

// const fs = require('fs');

dotenv.config()
connectToDb()


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


// const allowedOrigin = [process.env.FRONTEND, process.env.ADMIN]

// const corsOrigin = {
//   origin: (origin, callback)=>{
//     console.log(`allowedOrigin: ${allowedOrigin}`);
//     if (!origin || allowedOrigin.includes(origin)) {
//       callback(null, true)
//     }else{
//       console.log(`Blocked: ${origin}`);
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }


app.use(cors({origin: '*'}));

// const __dirname = path.resolve()

// console.log('Frontend Path:', path.join(__dirname, '../Frontend/dist/index.html'));

// app.use(express.static(path.join(__dirname, '/Frontend/dist')))
// app.use('/admin', express.static(path.join(__dirname, '/Admin/dist')))

// app.get('/admin/*', (req,res)=>{
//   res.sendFile(path.join(__dirname, 'Admin', 'dist', 'index.html'))
// })

// app.get('*', (req,res)=>{
//   res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
// })


// Configure multer storage for image uploads
// const storage = multer.diskStorage({
//   destination: 'upload/images',
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   }
// })

// const upload = multer({ storage: storage })

// app.use('/images', express.static('upload/images'))

// app.post("/upload", upload.single('product'), (req, res) => {
  
//   if (!req.file) {
//     return res.status(400).json({ error: "File upload failed" })
//   }
  
//   const baseUrl = req.protocol + '://' + req.get('host');
  
//   res.json({
//     success: 1,
//     image_url: `${baseUrl}/images/${req.file.filename}`, // Dynamic URL
//   });
// })


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer configuration (using memoryStorage to avoid local storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));



// Simple POST route for file upload
app.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Upload to Cloudinary
  cloudinary.uploader.upload_stream((error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }

      // Send back the URL of the uploaded image
      console.log(result.CLOUDINARY_URL);
  res.json({
      success: 1,
      image_url: result.CLOUDINARY_URL, // URL of the image on Cloudinary
    })
  }).end(req.file.buffer); 
  
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