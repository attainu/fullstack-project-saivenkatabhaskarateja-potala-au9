import express from 'express'
import data from './data.js'
const port = process.env.PORT || 5000
const app = express()


// healthcheck
app.get('/',(req,res)=>{
    res.send("server is ready")
})

 
//api for product list data -  homepage
app.get('/api/products',(req,res)=>{
    res.send(data.products)
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