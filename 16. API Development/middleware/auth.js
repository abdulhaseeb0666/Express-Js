import jwt from 'jsonwebtoken'
import User from '../models/users.models.js'

const auth = async (req, res, next) => {
  try{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined'){
      const token = bearerHeader.split(' ')[1]
      const user = jwt.verify(token, process.env.JWT_SECRET)
      
      req.token = user
      next()
    }else{
      res.status(401).json({message: 'No token provided'})
    }
  }catch(err){
    res.status(403).json({message: 'Invalid or expired token'})
  }
}

export default auth