const {user} = require ('../models/index');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendingMail } = require("../utils/mailing");

module.exports = {
    createCustomers: async (req, res) => {
        const { fullname, email, password } = req.body;
        try {
          const checkemail = await user.findUnique({
            where: { email },
          });
          if (checkemail) {
            return res.status(400).json({ error: "Email already exists" });
          }
    
          const otp = Math.floor(1000 + Math.random() * 9000);
          const hashpassword = await bcrypt.hash(password, 10);
          const verifyToken = crypto.randomBytes(32).toString("hex");
          const customer = await user.create({
            data: {
              fullname,
              email,
              password: hashpassword,
              role: "CUSTOMER",
              verifyToken,
              otp: otp,
            },
          });
          const emailText = `Your OTP is: ${otp}.`;
    
          await sendingMail({
            from: process.env.EMAIL,
            to: customer.email,
            subject: "Email Verification and OTP",
            text: emailText,
          });
    
          res.status(201).json({
            message:
              "customer registered successfully. Please check your email for verification instructions and OTP.",
          });
        } catch (error) {
          res.status(500).send(error);
          console.log(error);
        }
      },
      
  getLoggedInUser: async (req, res) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User not logged in" });
      }

      const loggedInUser = await user.findUnique({
        where: parseInt({ id: userId }),
      });

      if (!loggedInUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(loggedInUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.params;
    try {
      const customer = await user.findFirst({
        where: { OR: [{ verifyToken: token }, { otp: +token }] },
      });
      if (!customer) {
        return res
          .status(404)
          .json({ error: "Invalid verification token or OTP" });
      }
      let updateData = {
        isVerified: true,
        verifyToken: null,
      };
      if (customer.otp) {
        updateData.otp = null;
      }

      await user.update({
        where: { id: customer.id },
        data: updateData,
      });

      res.status(200).json({
        message: "Email/OTP verified successfully. You can now log in.",
      });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  customerSignin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await user.findUnique({
        where: { email },
      });
      if (!customer) {
        return res.status(410).json({ error: "Email doesn't exist" });
      }
      if (!customer.isVerified) {
        const newOtp = Math.floor(1000 + Math.random() * 9000);

        await user.update({
          where: { id: customer.id },
          data: { otp: newOtp },
        });
        const emailText = `Your new OTP is: ${newOtp}.`;
        await sendingMail({
          from: process.env.EMAIL,
          to: customer.email,
          subject: "New OTP for Verification",
          text: emailText,
        });
        return res
          .status(412)
          .json({ error: "User not verified. New OTP sent." });
      }
      const passwordMatch = await bcrypt.compare(password, customer.password);
      if (!passwordMatch) {
        return res.status(411).json({ error: "Invalid password" });
      }

      if (customer.role !== 'CUSTOMER') {
        res.status(403).json({ message: "Invalid user role" })

      }

      const token = jwt.sign({ id: customer.id, role: customer.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
      console.log(token)
      return res.status(201).json({ message: "Customer successfully logged in", token: token });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    console.log('Email received for password reset:', email);
    try {
      const customer = await user.findUnique({
        where: { email },
      });

      if (!customer) {
        return res.status(404).json({ error: "User with the provided email does not exist" });
      }

      const resetCode = Math.floor(1000 + Math.random() * 9000);
      await user.update({
        where: { id: customer.id },
        data: { resetCode: { set: resetCode } }
      });


      const emailText = `Your reset code is: ${resetCode}. Use this code to reset your password.`;
      await sendingMail({
        from: process.env.EMAIL,
        to: customer.email,
        subject: "Password Reset Code",
        text: emailText,
      });

      res.status(200).json({ message: "Reset code sent to your email" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  verifyResetCode: async (req, res) => {
    const { email, resetCode } = req.body;

    try {
      const customer = await user.findFirst({
        where: { email, resetCode: +resetCode },
      });

      if (!customer) {
        return res.status(404).json({ error: "Invalid reset code or email" });
      }

      res.status(200).json({ message: "Reset code verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
 updatePassword : async (req, res) => {
    const { email, newPassword } = req.body;
    try {
      const customer = await user.findUnique({
        where: { email },
      });
      if (!customer) {
        return res.status(404).json({ error: "User with the provided email does not exist" });
      }
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: customer.id },
        data: { password: hashNewPassword, resetCode: null },
      });
  
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getExpoToken: async (req, res) => {
    const id = req.userId;
    const token = req.body.token;

    try {
      await user.update({
        where: {
          id: id,
        },
        data: {
          expoToken: token,


        },
      });
      res.status(201).json({ message: "Expo token successfully received!", token: token });
    } catch (error) {
      res.status(500).json({ message: "no Expo token" });
    }
  },
  checkNotification: async (req, res) => {
    const id = req.userId

    try {
      const { hasNotification } = await user.findUnique({
        where: {
          id: id
        }
      })
      res.status(200).send(hasNotification)

    } catch (error) {

      console.log(error)
      res.status(500).json({ message: 'Failed to retrieve notification status' })

    }

  },
}
