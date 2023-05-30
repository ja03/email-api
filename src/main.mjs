import  express from "express"
import nodemailer from "nodemailer" 
import {config} from "dotenv"
import process from "process"
import { Console } from "console"

const app = express()     //creating an express application
app.use(express.json())
config()

app.use(express.static('Static'))

async function sendEmail(target, message){

    let transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SENDER_EMAIL, // generated ethereal user
          pass: process.env.AUTH_TOKEN, // generated ethereal password
        },
    });
    
      // send mail with defined transport object
        let info = await transporter.sendMail({
        from: `"Ahmad Mahmoud 👻" ${process.env.SENDER_EMAIL}`, // sender address
        to: target, // list of receivers
        subject: "Hello ✔", // Subject line
        text: message, // plain text body
        // html: "<b>Hello world?</b>", // html body 
    });

}

app.get("/hello",(request, respons) =>{
    respons.send("welcome to the site!")
})

app.post("/send-email", (req, res)=>{
    const {email}= req.body
    sendEmail(email, "Welcom to the site!")
    res.send("email sent")
})



app.listen(8080) //this will start the server
