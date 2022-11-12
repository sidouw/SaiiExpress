const nodeMailer = require('nodemailer')

let transporter = undefined

const emailInit = ()=>{
    transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:process.env.MAILUSER,
            pass:process.env.MAILPASSWORD
        }
    })
}




const sendGmail = (to='',subject='',text='',html='')=>{
    if(!transporter)
        return

    if(to==='')
        return

    const  mailOptions = {
        from: '"SaiiExpress"', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html// html body
    }
    // return new Promise
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        })
    
        if (require.main === module)
        console.log();
}

module.exports = {emailInit,sendGmail}