const {Schema,model,ObjectId} = require('mongoose');
/************************** MailVerification  Schema **************************/

const MailVerificationSchema = new Schema({
    user:{
        type:ObjectId,
        required : true,
        ref:'user'
    },
    type :{
        type:String, 
        required:true
    },
    data :{
        type:String, 
        required:true
    }
},{
    timestamps:true
}
);
const MailVerification = model("mailverification", MailVerificationSchema);
module.exports = MailVerification;