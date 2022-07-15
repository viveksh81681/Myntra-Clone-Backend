const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");

router.post("/", async (req, res) => {
  try {
    const Carts = await Cart.create(req.body);
    return res.status(200).send(Carts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const Carts = await Cart.find().lean().exec();
    return res.status(200).send(Carts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.patch("/:id/", async(req, res) => {
    try{
        const Carts = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).send(Carts);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.delete("/:id/", async(req, res) => {
    try{
        const Carts = await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).send(Carts);
    }catch(err){
        return res.status(500).send(err.message);
    }
});
module.exports = router;
