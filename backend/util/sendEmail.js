const nodeMailer = require('nodemailer')

const sendEmail = async(options) =>{
    const transporter = nodeMailer.createTransport({
        // host : process.env.SMTP_HOST,
        // port : process.env.SMTP_PORT,
        host: "smtp.gmail.com",
        port: 587,
        secure:false,
        // service : process.env.SMTP_SERVICE,
        auth:{
            user:"nilkantmanik@gmail.com",
            pass:"czqi jtkx zami qvpn",
        },
    });

    const mailOptions = {
        from:"nilkantmanik@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,

    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error,'error');
        }
        else{
            // console.log('mail sent',info);
        }
    });
};

module.exports = sendEmail;