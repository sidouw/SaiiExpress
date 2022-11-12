const {Schema,model,ObjectId} = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
/************************** User Schema **************************/

const userSchema = new Schema({
    fullname:{
        type:String, 
        required:true,
    },
    email :{
        type:String, 
        required:true,
        unique :true
    }
    ,
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    },
    shippingadresses:[{
        fullname:String,
        phonenumber:String,
        adress1:String,
        adress2:String,
        country:String,
        city:String,
        state:String,
        zip:Number,
        default:Boolean
    }],
    cart :[
            {
                product:{
                    type:ObjectId, 
                    required:true,
                    },
                sku:{
                    type:Number, 
                    required:true,
                    },
                qty:{
                    type:Number, 
                    default :1
                    }
            }],
    whishlist :[
            {
                product:{
                    type:ObjectId, 
                    required:true,
                    }
            }]
},{
    timestamps:true
}
)

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.genAuthToken =async function(){
    try {
        const token = jwt.sign({
                id:this._id.toString()},
                process.env.SECRET,
                { expiresIn: '8h' })
                
        return token
    } catch (error) {
        throw Error(error)
    }
}

userSchema.statics.findByCred = async (email,password)=>{
    try {
        const user =await User.findOne({email})
    if(! user){
        throw new Error('Unable to login')
    }
    
    const isAMatch = await bcrypt.compare(password,user.password)
    if (! isAMatch) {
        throw new Error('Unable to login password')
    }
    return user
    } catch (error) {
        throw Error(error)
    }
}

userSchema.pre('save',async function (next) {
    if(this.isModified('password')){
        try {
            this.password = await bcrypt.hash(this.password,8)
            next()
        } catch (error) {
            next()
        }
    }
    
})
const User = model("user", userSchema);
module.exports = User;