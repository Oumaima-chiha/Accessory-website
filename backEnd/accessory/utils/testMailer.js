const {sendingMail} = require("./mailing");

sendingMail({from:process.env.EMAIL,to:'chihaouma@gmail.com',subject:'this is a test',text:'testtt'})
