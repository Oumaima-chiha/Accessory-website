
const { jewelry } =require('../models/index')

module.exports = {
    getJeweleries: async (req, res) => {
        try {
            const {collection}=req.query
            console.log(collection)
            const Jewelries = await jewelry.findMany({
                where: {
                  status: "Available",
                },
            });

            res.status(200).json(Jewelries);
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
        },
        }
