const express = require('express')
const cors = require('cors')
const prisma = require("./models/index");
var bodyParser = require('body-parser');
const jewelryRouter=require('./routes/Jewelry')
const customersRouter=require('./routes/customer')
const cartRouter =require('./routes/cart')
const paymentRouter =require('./routes/payment')



const app = express()



const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connect = async () => {
    try {
        await prisma.$connect()
        console.log("connected successfully!")
    }
    catch (error) {
        console.log(error, 'not connected')
    }
}

connect()
app.use('/api/Jewelry',jewelryRouter)
app.use('/api/customers', customersRouter)
app.use('/api/cart', cartRouter)
app.use('/api/pay', paymentRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
