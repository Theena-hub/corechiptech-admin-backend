const express=require('express')
const app=express()
const db=require('./dbConfig')
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/uploads', express.static('uploads'))

const User = require("./router/user");
app.use("/", User);

const Product = require("./router/product");
app.use("/product", Product);

const Banner = require("./router/banner");
app.use("/banner", Banner);

app.listen(1234,()=>{
    console.log("Server Connected Successfully")
})