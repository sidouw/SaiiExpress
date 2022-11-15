const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Order = require('../models/order')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const {auth} = require('../utils/authUtils')
const crypto = require('crypto')
const { promisify } = require("util")
const randomBytes = promisify(crypto.randomBytes)

// Logout ,auth
router.post('/chackout-session',auth,async (req,res)=>{
    try {
        if(!req.body.orders)
            return res.status(400).send("no orders")

        const orders= req.body.orders
        const ordersIDs =  orders.map(or=>or.product)
        const products = await Product.find({"_id" : { "$in" : ordersIDs}})
        const items = products.map(prod=>{
            orderIndex = orders.findIndex(or=>or.product===prod._id.toString())
            return{
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: prod.name,
                  },
                  unit_amount: prod.skus[orders[orderIndex].sku].price*100,
                },
                quantity: orders[orderIndex].qty,
            }
        })
        const rawBytes = await randomBytes(16)
        const sessionId = rawBytes.toString('hex')

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items:items,
            success_url: `http://${process.env.BASEURL}/checkout/completed?id=${sessionId}`,
            cancel_url: `http://${process.env.BASEURL}/`,
          })
          for (let i = 0; i < orders.length; i++){
            const order= new Order({
                checkoutId:sessionId,
                user:req.user._id,
                product:orders[i].product,
                qty:orders[i].qty,
                sku:orders[i].sku,
            })
            console.log(order);
            await order.save()
          }
          res.send(session.url)
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }
})
// confirm orders
router.get('/chackout-session',auth,async (req,res)=>{
    try {
        const sessionID=req.query.id
        if(!sessionID)
            return res.status(400).send("ID Not Found")

        const uOrders = await Order.updateMany({checkoutId:sessionID,confirmed:false},{ $set: { confirmed:true } },{multi:true})
        if(uOrders.modifiedCount>0)
            req.user.cart= []
            await req.user.save()
        res.send(uOrders.modifiedCount>0)
        
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }
})

module.exports = router