const {Schema,model,ObjectId} = require('mongoose');
/************************** Project  Schema **************************/

const ProductSchema = new Schema({
    name:{
        type:String, 
        required:true,
    },
    description :{
        type:String,
    },
    image:{
        link:String,
        blur:String
    },
    orders:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default: 0
    },
    category:{
        type:String,
        default: "0"
    },
    tags:{
        type:Array,
        default: []
    },
    skus:[
        {   
            name:{
                type:String, 
                required:true
            },
            images:{
                type:Array, 
                default :[]
            },
            qty:{
                type:Number, 
                default:0
            },
            price:{
                type:Number,
                default:1
            }
        }],
},{
    timestamps:true
}
);

ProductSchema.index({name: 'text',description: 'text',tags:'text'});

const Product = model("product", ProductSchema);
module.exports = Product;