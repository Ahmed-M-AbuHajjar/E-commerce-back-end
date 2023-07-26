import nodemailer from 'nodemailer'
export async function sendEmail(dest,subject, message) {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodeMailerEmail, // generated ethereal user
            pass: process.env.nodeMailerPassword, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"ECommerce" < ${process.env.nodeMailerEmail}>`, // sender address
        to: dest, // list of receivers
        html: message, // html body
        subject:subject,
        attachments:[],
    });
    return info
}
