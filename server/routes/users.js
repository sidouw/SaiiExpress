const express = require('express')
const fs = require('fs')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const MailVerification = require('../models/mailverification')
const {auth} = require('../utils/authUtils')
const {sendGmail} = require('../utils/emailUtils')
const Order = require('../models/order')
// TODO Validate the Emails


// Login
router.post('/users/login',async (req,res)=>{

    try {
        const user = await User.findByCred(req.body.email,req.body.password)

        if(!user.confirmed)
            return res.status(401).send("Please confirm your email")

        const token = await user.genAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error:'Wrong Email or Password'})
    }
})

// Logout 
router.get('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens =req.user.tokens.filter((token)=> req.token !== token)
        await req.user.save()
        res.status(200).send({user:req.user})
    } catch (error) {
        res.status(400).send({error})
    }
})

// check auth
router.get('/users/auth',auth,(req,res)=>{
    res.send(req.user)
})

// Create User
router.post('/users/register',async (req,res)=>{
    let userID = ''
    try {
        const user = new User(req.body)
        await user.save()
        // const token = await user.genAuthToken()
        const verification = new MailVerification()
        userID =user._id
        verification.type = 'confirmation'
        verification.user = user._id
        verification.data = "true"
        await verification.save()
        sendGmail(user.email,//change to Promis
                    "Confirmation Emil",
                    `Vefication Link:${process.env.BASEURL}/confirm/${verification._id}`,
                    `<h3>Vefication Link: ${process.env.BASEURL}/confirm/${verification._id}</h3>`)
        res.send("A verification Email was sent to your Email adress")

    } catch (error) {
        if(userID!='')
            await  User.findByIdAndDelete(userID)
        res.status(400).send({error:'Email already in use'})
    }
})

router.get('/users/confirm',async (req,res)=>{
    try {
        // req.user.tokens =req.user.tokens.filter((token)=> req.token !== token)
        // await req.user.save()
        if(!req.query.id || req.query.id=='')
            return res.status(400).send("please send an id")
        
        const verification = await MailVerification.findById(req.query.id)
        if (!verification) 
            return res.status(404).send("Link Not Found")
        const user = await User.findById(verification.user)
        if (!user)
            return res.status(404).send("User Link Not Found")  
        const verificationType = verification.type
        switch (verificationType) {
            case 'email':
                user.email=verification.data
                break
            case 'password':
                user.password = verification.data
                break
            case 'confirmation':
                user.confirmed = true
                break
            default:
                break
        }
        await user.save()
        await verification.remove()
        res.status(200).send(verificationType)
    } catch (error) {
        res.status(400).send({error})
    }
})

// Edit User Info
router.patch('/users/info',auth,async(req,res)=>{
    const allowedupdates = ['fullname','phonenumber']
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        
        return res.status(400).send()
    }
    try {

        updates.forEach((update)=>req.user[update]= req.body[update])

        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

// Edit Email
router.patch('/users/email',auth,async(req,res)=>{
    const allowedupdates = ['email']
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        
        return res.status(400).send("Update not allowed")
    }
    try {
        // Check if Email Alraedy exists
        const user = User.findOne({email:req.body.email})
        if (user)
            return res.status(400).send("Email already in use") 
        const verification = new MailVerification()
        verification.type = 'email'
        verification.user = req.user._id
        verification.data = req.body.email
        await verification.save()
        sendGmail(req.user.email,//change to Promis
                    "Email Verification",
                    `Vefication Link:${process.end.BASEURL}/confirm/${verification._id}`,
                    `<h3>Vefication Link: ${process.end.BASEURL}/confirm/${verification._id}</h3>`)
        res.send("A verification Email was sent to your Email adress")
    } catch (error) {
        res.status(500).send("An Error occurred while changing your Email")
    }
})

// Edit password
router.patch('/users/password',auth,async(req,res)=>{
    try {
        const isAMatch = await bcrypt.compare(req.body.currentpassword,req.user.password)
        if (!isAMatch)
            return res.status(401).send()

        const verification = new MailVerification()
        verification.type = 'password'
        verification.user = req.user._id
        verification.data = req.body.newpassword 
        await verification.save()
        sendGmail(req.user.email,//change to Promis
                    "Password Verification",
                    `Vefication Link:${process.env.BASEURL}/confirm/${verification._id}`,
                    `<h3>Vefication Link: ${process.env.BASEURL}/confirm/${verification._id}</h3>`)
        res.send("A verification Email was sent to your Email adress")

    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})

// Recover password
router.get('/users/recoverpassword',async (req,res)=>{

    try {
        if(!req.query.email || req.query.email=='')
            return res.status(400).send("please send an email")
        
        const user = await User.findOne({email:req.query.email})
            if(!user)
                return res.status(404).send("No user with this Email ")

        const verification = new MailVerification()
        verification.type = 'passwordrecovery'
        verification.user = user._id
        verification.data = req.query.email
        await verification.save()
        console.log(verification._id);
        sendGmail(req.query.email,//change to Promis
                    "Password Recovery",
                    `Recovery Link:${process.env.BASEURL}/recover/${verification._id}`,
                    `<h3>Recovery Link: ${process.env.BASEURL}/recover/${verification._id}</h3>`)//TODO delete after Fail
        res.send("A verification Email was sent to your Email adress")
    } catch (error) {
        res.status(400).send({error})
    }
})

router.get('/users/recoverpasswordcheck',async (req,res)=>{

    try {
        const verification = await MailVerification.findById(req.query.id)
        if(verification.type != 'passwordrecovery')
            return res.status(401).send("something went wrong !! ")
        res.send(verification.type)
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/users/recoverpassword',async (req,res)=>{

    try {
        const verification = await MailVerification.findById(req.body.id)

        if(verification.type != 'passwordrecovery')
            return res.status(401).send("something went wrong !! ")
        
        const user = await User.findById(verification.user)
        
        user.password= req.body.newpassword
        await user.save()
        await verification.remove()
        res.send("Password Updated")
    } catch (error) {
        res.status(400).send({error})
    }
})


// Add shippingAdress
router.post('/users/adress',auth,async (req,res)=>{
    try {
        req.user.shippingadresses.push(req.body)
        await req.user.save()

        res.status(201).send(req.body)
    } catch (error) {
        res.status(500).send({error:'Failed To add adress'})
    }
})
// set default adress
router.patch('/users/adress',auth,async (req,res)=>{
    try {
        for (let index = 0; index < req.user.shippingadresses.length; index++) {
            req.user.shippingadresses[index].default = false
        }
        const adressIndex = req.user.shippingadresses.findIndex(ad=>ad.adress1===req.body.adress)
        if (adressIndex<0)
            return res.status(404).send({error:'Address not found'})
        
        req.user.shippingadresses[adressIndex].default = true
        await req.user.save()
        res.status(200).send(req.user.shippingadresses[adressIndex])
    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch('/users/cart',auth,async(req,res)=>{
    //TODO make sure cart item is valid
    try {
        const item = req.user.cart.find(it => it.product.toString() === req.body.product)
        if(item)
            return res.status(422).send("Item Alraedy In Cart")

        req.user.cart.push(req.body)
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/users/cart',auth,async(req,res)=>{
    try {
        const filtredCart = req.user.cart.filter(it => it.product.toString() !== req.body.product)
        req.user.cart = filtredCart
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/users/whish',auth,async(req,res)=>{
    try {
        const filtredWhishlist = req.user.whishlist.filter(it => it.product.toString() !== req.body.product)
        req.user.whishlist = filtredWhishlist
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/users/whish',auth,async(req,res)=>{
    try {
        const item = req.user.whishlist.find(it => it.product.toString() === req.body.product)
        if(item)
            return res.status(422).send("Item Alraedy WhishListsed")

        req.user.whishlist.push(req.body)
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/orders',auth,async(req,res)=>{
    try {
        const orders = await Order.find({user:req.user._id,confirmed:true}).populate('product')
        res.send(orders)
    } catch (error) {
        res.status(500).send()
    }
})


// Delete User 
// router.delete('/users',auth,async (req,res)=>{
//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (error) {
//         res.status(400).send()
//     }
// })

// Edit Users
// router.patch('/usersm',auth,async(req,res)=>{

//     try {
//         const update = await User.updateMany(
//             { _id: { $in: req.body.selectedUsers} },
//             { $set: { role:req.body.role } },
//             {multi: true}
//          )
//          res.send(update.acknowledged)
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
     
// })

// Delete Users
// router.delete('/usersm',auth,async(req,res)=>{

//     try {
//         const update = await User.deleteMany(
//             { _id: { $in: req.body.selectedUsers} }
//          )
//          res.send(update.acknowledged)
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// })


// Find user by ID
router.get('/users/:id',auth,async (req,res)=>{
    try {
        const user =await User.findOne({_id:req.params.id})
        if(! user){
            return  res.status(400).send({error:'User Not Found'})
        }
        res.send(user)
    } catch (error) {
        res.status(400).send({error})
    }

})

// Find all users 
router.get('/users',auth,async (req,res)=>{
    try {
        const users =await User.find()
        if(! users){
            return  res.status(400).send({error:'no user found'})
        }
        res.send(users)
    } catch (error) {
        res.status(400).send({error})
    }

})

// Upload User Image 
// router.post('/users/image',auth,async (req,res)=>{
//     try {
//         const img = req.body.image
//         var data = img.replace(/^data:image\/\w+;base64,/, "")
//         var buf = Buffer.from(data, 'base64')
//         // fs.writeFileSync(path.join(path.dirname(__dirname),'public','images',req.user._id+'.jpg'),buf)
//         fs.writeFileSync(path.join(path.dirname(__dirname),req.user._id+'.jpg'),buf)
//         req.user.photo_url = true
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         console.log(error);
//         console.log(error);
//         res.status(400).send()
//     }
// })

// Get User Image
// router.get('/users/image',(req,res)=>{
//     res.sendFile(path.join(path.dirname(__dirname),'public','images',req.query.img+'.jpg'))
// })

module.exports = router