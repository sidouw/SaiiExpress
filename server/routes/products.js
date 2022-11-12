const express = require('express')
const router = express.Router()
const Product = require('../models/product')
// const {auth,developer,admin} = require('../utils/authUtils')


// Create Product
// router.post('/products',async (req,res)=>{

//     try {
//         const product = new Product(req.body)
//         await product.save()
//         res.status(201).send(product)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// Edit Product 
// router.patch('/products',async(req,res)=>{
//     const allowedupdates = ['name','description','users','_id']
//     const updates = Object.keys(req.body)
//     const isValid = updates.every(update=> allowedupdates.includes(update))
//     if(!isValid){
//         return res.status(400).send()
//     }
//     try {
//         const product = await Product.findById(req.body._id)
//         if (!product) {
//             return res.status(400).send()
//         }

//         updates.forEach((update)=>product[update]= req.body[update])
        
//         await product.save()

//         res.send(product)
//     } catch (error) {
//         res.status(500).send()
//     }
// })

// add edit users
router.patch('/productsU',async(req,res)=>{
    try {

       await Product.findOneAndUpdate(
            { _id: req.body.Product },
            {  "$addToSet": {
                users: {
                  "$each":req.body.selectedUsers
                }
              }},
             )
        res.send()
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})




// Delete Product 
// router.delete('/products',async (req,res)=>{
//     try {
//         await Product.deleteOne({ _id: req.body._id })
//         // TODO Delete all product tickets and ticket comments
//         res.status(200).send()
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// Find product by ID
router.get('/products/:id',async (req,res)=>{
    try {
        const product = await Product.findOne({_id:req.params.id})
        if(! product){
            return  res.status(400).send({error:'Product Not Found'})
        }
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }

})

// Find all products 
router.get('/products',async (req,res)=>{
    
    try {
        
        if(req.query.ids){
            
            const products =await Product.find({ 
                _id: {
                    $in: req.query.ids
                }
            })
            console.log(req.query.ids);
            if(!products){
                return  res.status(400).send({error:'Product Not Found'})
            }

            return res.send(products)

        }else if (req.query.skip || req.query.limit){
            
            const searchString = req.query.q 
            const searchCategory = req.query.cat 
            const maxPrice = req.query.map ||999999
            const minPrice = req.query.mip ||-1
            const order = req.query.order === '1'?1:-1
            const sortBy = req.query.sortBy || 'rating'
            const fUp = req.query.fUp === 'true' ||false
            const skip = req.query.skip?req.query.skip>0? req.query.skip: 0 : 0 
            const limit = req.query.limit || 15 

            // const products =await Product.find().skip(skip).limit(limit).exec()
            console.log(req.query);
            const searchQuery = { 
                skus:{$elemMatch: {price:{ $gt: minPrice, $lt : maxPrice }}},
            }

            if (searchString)
                searchQuery.$text = { "$search": searchString }

            if(searchCategory)
                searchQuery.category = searchCategory
            if(fUp)
                searchQuery.rating = { $gt: 4 }
                
            const sortObject ={}

            sortObject[sortBy]=order
            const products =await Product.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .sort(sortObject)
                .exec()
            const totalProducts =  await Product.find().count()
            if(!products){
                return  res.status(400).send({error:'Product Not Found'})
            }
            return res.send({products,totalProducts,skip})
            // return res.send(products)
        }
            
      
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }
})


module.exports = router