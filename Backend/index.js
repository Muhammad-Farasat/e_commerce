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

app.use(cors());

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

let message = 'Hello, World!';

// GET route
app.get('/message', (req, res) => {
  res.json({ message }); // Return the current message
});

app.post('/message', (req, res) => {
  const { newMessage } = req.body;

  if (!newMessage) {
    return res.status(400).json({ error: 'New message is required' });
  }

  message = newMessage;
  res.json({ success: true, updatedMessage: message });
});


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

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'upload', 
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`,
  },
});

const upload = multer({ storage });


app.post("/upload", upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "File upload failed" });
  }

  const imageUrl = req.file.path;
  res.json({
    success: 1,
    image_url: imageUrl, 
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