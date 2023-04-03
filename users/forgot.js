import Forgetpassword from "../../models/Forgetpassword";
import User from "../../models/User"
export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = `vfkusdvaksdvhlsv6345v4646873896dfouikvhfdbvh`;
    let forgot = new Forgetpassword({
      email: req.body.email,
      token: token,
    });
    let email = `
        You got this email in response to your request to reset your password on JavascriptFolks.com
        
        To reset your password, please follow the below instructions:
        1. Click on the link below
        <a href={https://Javascriptfolks.com/forget?token=${token}}>Reset your password here</a>
        <br/><br/>
        2. Make sure your password strength should be strong.
        <br/><br/>
        3. We recommend that you keep your password scure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and Change your password.
        <br/><br/>
        `;
    res.status(200).json({ success: true });
  } else {
  } 
}
