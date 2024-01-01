const { user } = require("../model/index");


module.exports = isCustomerAuthorized = async (req, res, next) => {

    const id = req.userId

    try {
        const customer = await user.findUnique({
            where: {
                id: id
            }
        })

        if (customer.isVerified === false) {
            res.status(403).json({ message: 'Customer is not verified' })
        }

        if (customer.role === 'CUSTOMER') {
            next()
        }

        else {

            res.status(403).json({ message: "Couldn't authenticate user" })

        }

    } catch (error) {

        console.log(error, 'Couldnt get user role')
        res.status(500).send(error)

    }


}