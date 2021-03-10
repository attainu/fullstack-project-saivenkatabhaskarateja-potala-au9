import express from 'express'
import data from './data.js'
const port = process.env.PORT || 5000
const app = express()


// healthcheck
app.get('/',(req,res)=>{
    res.send("server is ready")
})


//api for product data
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.listen(port,() =>{
    console.log(`serve at http://localhost:${port}`);
})