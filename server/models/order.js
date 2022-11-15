const {Schema,model,ObjectId} = require('mongoose');
/************************** Project  Schema **************************/

const OrderSchema = new Schema({
    checkoutId:{
        type:String, 
        required:true,
    },
    user:{
        type:ObjectId, 
        required:true,
    },
    product :{
        type:ObjectId,
        ref:'product',
        required:true,
    },
    qty:{
        type:Number,
        default:1
    },
    sku:{
        type:Number,
        default:0
    },
    confirmed:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
}
);

OrderSchema.index({name: 'text',description: 'text',tags:'text'});

const Order = model("order", OrderSchema);
module.exports = Order;