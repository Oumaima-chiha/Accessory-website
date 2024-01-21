
const { jewelry,tag,tagOnJewelries } =require('../models/index')

module.exports = {
    getTags: async (req, res) => {
      const tags =await tag.findMany({})
      res.status(200).json(tags)
    },
    getJeweleries: async (req, res) => {
        try {
            const Jewelries = await jewelry.findMany({
                where: {
                  status: "Available",
                },
                include:{
                  tags:true,
                }
            });

            res.status(200).json(Jewelries);
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
        },
        getJewelryByTagId: async (req, res) => {
          try {
            const { tagId } = req.params;
        
            // Check if the tag ID exists
            const tagExists = await tag.findUnique({
              where: {
                id: parseInt(tagId),
              },
            });
        
            if (!tagExists) {
              return res.status(404).json({ error: 'Tag not found' });
            }
        
            // If tag ID exists, proceed with the query
            const jewelryWithTags = await tagOnJewelries.findMany({
              where: {
                tagId: parseInt(tagId),
              },
              include: {
                jewelry: true,
              },
            });
        
            const jewelries = jewelryWithTags.map((jewelryWithTag) => jewelryWithTag.jewelry);
        
            res.status(200).json(jewelries);
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
        },
        addTagOnJewelries: async (req, res) => {
          try {
            const { tagId, jewelryId } = req.params;
        
            // Check if the tag and jewelry IDs exist
            const existTag = await tag.findUnique({
              where: {
                id: parseInt(tagId),
              },
            });
        
            const existJewelry = await jewelry.findUnique({
              where: {
                id: parseInt(jewelryId),
              },
            });
        
            if (!existTag) {
              return res.status(404).json({ error: 'Tag not found' });
            }
        
            if (!existJewelry) {
              return res.status(404).json({ error: 'Jewelry not found' });
            }
        
            // If tag and jewelry IDs exist, proceed to add the tag
            const newTagOnJewelries = await tagOnJewelries.create({
              data: {
                tagId: parseInt(tagId),
                jewelryId: parseInt(jewelryId),
              },
            });
        
            res.status(201).json(newTagOnJewelries);
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
        },
        
        }
