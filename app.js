

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
.catch(err => console.log("MongoDB Error:", err));
const orderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

app.get("/", (req, res) => {
    res.send("Restaurant Backend Running 🚀");
});

app.post("/order", async (req, res) => {
    const order = new Order(req.body);
    await order.save();

    res.json({
        message: "Order saved in MongoDB!",
        orderId: order._id
    });
});

app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});