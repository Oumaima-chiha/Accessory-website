const { user, restaurant } = require("../model/index");


module.exports = isPremiumAuthorized = async (req, res, next) => {

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

        if (ownerRestaurant.accountType === 'NONE' || ownerRestaurant.accountType === 'BASIC') {
            console.log('here')
            res.status(403).json({ message: 'Owner account unauthorized' })
        }

        else if (ownerRestaurant.accountType === 'PREMIUM') {
            return next()
        }

        else {
            res.status(403).json({ message: "Couldn't authenticate user" })

        }

    } catch (error) {

        console.log(error, 'Couldnt get user account type')
        res.status(500).send(error)

    }


}