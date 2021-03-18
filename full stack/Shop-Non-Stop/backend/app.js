import express from 'express'
import data from './data.js'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'
const port = process.env.PORT || 5000
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/ShopNonStop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))
//for parsing and urlencoding
app.use(cors())

//api for sending client id for paypal
app.get('/api/config/paypal',(req,res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

//api for users data
app.use("/api/users", userRouter);

//api for porducts data
app.use("/api/products",productRouter)

//api for placing orders
app.use("/api/orders",orderRouter)

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

// healthcheck
app.get('/',(req,res)=>{
    res.send("server is ready")
})



//api from product details - productdetails page
app.get("/api/products/:id", (req, res) => {

    let product = data.products.find((x) => x._id === req.params.id)
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:"Product not found"})
    }
});


app.listen(port,() =>{
    console.log(`serve at http://localhost:${port}`);
})