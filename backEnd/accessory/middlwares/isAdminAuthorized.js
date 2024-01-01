const { user } = require("../model/index");


module.exports = isAdminAuthorized = async (req, res, next) => {

    const id = req.userId

    try {
        const admin = await user.findUnique({
            where: {
                id: id
            }
        })



        if (admin.role === 'ADMIN') {
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