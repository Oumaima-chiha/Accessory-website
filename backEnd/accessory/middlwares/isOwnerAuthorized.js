const { user, restaurant } = require("../model/index");


module.exports = isOwnerAuthorized = async (req, res, next) => {

    const id = req.userId

    try {
        const owner = await user.findUnique({
            where: {
                id: id
            }
        })

        const ownerRestaurant = await restaurant.findFirst({
            where: {
                ownerId: id
            }
        })

        if (ownerRestaurant && ownerRestaurant.status === 'Declined') {
            res.status(403).json({ message: 'Owner account declined' })
        }

        if (owner.isVerified === false) {
            res.status(403).json({ message: 'Owner is not verified' })
        }

        if (owner.role === 'OWNER') {
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