const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");

// Port details and connect function
const port = process.env.PORT || 5399;
const connect = require("./configure");

app.use(express.json());
app.use(cors());

// routers details
const ProductRouter = require("./Controllers/Product.Controller");
// const UserRouter = require("./Controllers/User.Controller");
const CartRouter = require("./Controllers/Cart.Controller");


// app.use("/users/", UserRouter);
app.use("/products/", ProductRouter);
app.use("/cart/", CartRouter);

const {register, login} = require("./Controllers/User.Controller")

app.post("/register",register)
app.post("/login",login)


app.listen(port,  async() => {
    try{
        await connect();
        console.log(`Port 5399 is listening..`);
    }
    catch(err){
        console.log(err);
    }
})
