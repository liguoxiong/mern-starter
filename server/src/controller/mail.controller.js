import nodeMailer from "nodemailer";
import Info from "./../models/info.model";

const sendMail = async (req, res) => {
  try {
    const info = await Info.find();
    const mailTo = info[0].email;
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "lequochungcdt@gmail.com", // generated ethereal user
        pass: "qamrbrinoazkahec" // generated ethereal password
      }
    });

    const sent = await transporter.sendMail({
      from: "lequochungcdt@gmail.com", // sender address
      to: mailTo, // list of receivers
      subject: `From vulocgroup  - Yêu cầu từ ${req.body.name}`, // Subject line
      text: `Yêu cầu từ ${req.body.name} - số điện thoại ${req.body.phone} với nội dung: ${req.body.message}`, // plain text body
      html: `<div>Yêu cầu từ:<div> <h4>${req.body.name}</h4> - <div>số điện thoại:</div> <h3>${req.body.phone}</h3> <div>Email:</div> <h3>${req.body.email}</h3> <div>Nội dung:</div> <p>${req.body.message}</p>` // html body
    });
    // validate the request body first

    return res.status(200).send({
      success: true,
      message: sent.messageId
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

export default {
  sendMail
};
