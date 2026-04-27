import express from 'express';
const app = express();
import studentRoutes from './routes/students.routes.js'
import connectDB from './config/database.js'
import auth from './middleware/auth.js'
import userRoutes from './routes/user.routes.js'
import { MulterError } from 'multer'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'

connectDB()

const PORT = process.env.PORT

const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 5,
  message: "Too many request from this IP, please try again later."
})

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/uploads', express.static(path.join(path.resolve(),'uploads')))

app.use(cors())

app.use(helmet())

app.use(limiter)

app.use('/api/users', userRoutes)

app.use(auth)
app.use('/api/students', studentRoutes)

app.use((error,req,res,next)=>{
  if(error instanceof MulterError){
    return res.status(400).send(`Image Error: ${error.message} : ${error.code}`)
  }else if(error){
    return res.status(500).send(`Something went wrong: ${error.message}`)
  }
  next()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});