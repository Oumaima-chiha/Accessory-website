
const { jewelry,tag,tagOnJewelries,favoriteList,jewelryOnFavorite } =require('../models/index')
const cloudinary =require("../utils/cloudinary")

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
              // Check if the Tag is already on the Jewelry list
              const existingItem = await jewelryOnFavorite.findFirst({
                  where: {
                      tagId:  parseInt(tagId, 10),
                      jewelryId: parseInt(jewelryId, 10),
                  },
              });

              if (existingItem) {
                  return res.status(400).json({ message: 'tag already on jewelry' });
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
    /**
     * Favorite section
     */
    getFavorites:async (req,res)=>{
        try {
            const userId = req.userId;

            // Find the user's favorite list
            const list = await favoriteList.findUnique({
                where: { userId },
                include: {
                    items: {
                        include: {
                            jewelry: true,
                        },
                    },
                },
            });

            if (!list) {
                return res.status(404).json({ message: 'Favorite list is empty' });
            }

            const { id, totalFavorites, items } = list;

            const favoritesResponse = {
                id,
                totalFavorites,
                items
            };

            res.status(200).json(favoritesResponse);
        } catch (error) {
            console.error('Error retrieving favorites:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    addToFavorites : async (req, res) => {
        try {
            const userId = req.userId;
            const jewelryId = req.params.jewelryId;

            // Check if the jewelry item exists
            const foundJewelry = await jewelry.findUnique({
                where: {id: parseInt(jewelryId, 10)},
            });

            if (!foundJewelry) {
                return res.status(404).json({message: 'Jewelry not found'});
            }

            // Check if the user's favorite list already exists
            let userFavoriteList = await favoriteList.findUnique({
                where: {userId},
            });

            // If the favorite list doesn't exist, create a new one
            if (!userFavoriteList) {
                userFavoriteList = await favoriteList.create({
                    data: {
                        user: {connect: {id: userId}},
                        totalFavorites: 0,
                    },
                });
            }

            // Check if the jewelry is already in the favorite list
            const existingItem = await jewelryOnFavorite.findFirst({
                where: {
                    listId: userFavoriteList.id,
                    jewelryId: parseInt(jewelryId, 10),
                },
            });

            if (existingItem) {
                return res.status(400).json({message: 'Jewelry already in favorites'});
            }

            // Update totalFavorites count
            await favoriteList.update({
                where: {id: userFavoriteList.id},
                data: {totalFavorites: userFavoriteList.totalFavorites + 1},
            });

            // Add the jewelry to the favorite list
            await jewelryOnFavorite.create({
                data: {
                    favoriteList: {connect: {id: userFavoriteList.id}},
                    jewelry: {connect: {id: foundJewelry.id}},
                },
            });

            res.status(200).json({message: 'Jewelry added to favorites successfully'});
        } catch (error) {
            console.error('Error adding to favorites:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    removeFromFavorites : async (req, res) => {
        try {
            const userId = req.userId;
            const jewelryId = req.params.jewelryId;

            // Check if the jewelry item exists
            const foundJewelry = await jewelry.findUnique({
                where: { id: parseInt(jewelryId, 10) },
            });

            if (!foundJewelry) {
                return res.status(404).json({ message: 'Jewelry not found' });
            }

            // Check if the user's favorite list exists
            const userFavoriteList = await favoriteList.findUnique({
                where: { userId },
            });

            if (!userFavoriteList) {
                return res.status(404).json({ message: 'Favorite list not found' });
            }

            // Check if the jewelry is in the favorite list
            const existingItem = await jewelryOnFavorite.findFirst({
                where: {
                    listId: userFavoriteList.id,
                    jewelryId: parseInt(jewelryId, 10),
                },
            });

            if (!existingItem) {
                return res.status(400).json({ message: 'Jewelry not in favorites' });
            }

            // Remove the jewelry from the favorite list
            await jewelryOnFavorite.delete({
                where: {
                    id: existingItem.id,
                },
            });

            // Update totalFavorites count
            await favoriteList.update({
                where: { id: userFavoriteList.id },
                data: { totalFavorites: userFavoriteList.totalFavorites - 1 },
            });

            res.status(200).json({ message: 'Jewelry removed from favorites successfully' , removedId:existingItem.id});
        } catch (error) {
            console.error('Error removing from favorites:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    removeAllFavorites : async (req, res) => {
        try {
            const userId = req.userId;

            // Check if the user's favorite list exists
            const userFavoriteList = await favoriteList.findUnique({
                where: { userId },
            });

            if (!userFavoriteList) {
                return res.status(404).json({ message: 'Favorite list not found' });
            }

            // Delete all items from the favorite list
            await jewelryOnFavorite.deleteMany({
                where: {
                    listId: userFavoriteList.id,
                },
            });

            // Update totalFavorites count to 0
            await favoriteList.update({
                where: { id: userFavoriteList.id },
                data: { totalFavorites: 0 },
            });

            res.status(200).json({ message: 'All items removed from favorites successfully' });
        } catch (error) {
            console.error('Error removing all favorites:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    // jewelryController.js


    createJewelry : async (req, res) => {
        try {
          const {
            name: $name,
            description: $description,
            category: $category,
            status: $status,
            price: $price,
            quantity: $quantity,
            main_image: $main_image,
            extra_images: $extra_images
          } = req.body;
      
          // Upload main image to Cloudinary
          const mainImage = await cloudinary.uploader.upload(req.body.main_image, {
            folder: 'your_cloudinary_folder',
          });
      
          // Upload extra images to Cloudinary
          const extraImages = await Promise.all(
            req.body.extra_images.map(async (extraImage) => {
              return await cloudinary.uploader.upload(extraImage, {
                folder: 'your_cloudinary_folder',
              });
            })
          );
      
          const newJewelry = await jewelry.create({
            data:{
            name: $name,
            description: $description,
            category:$category,
            main_image: mainImage.secure_url,
            extra_images: extraImages.map((image) => image.secure_url),
            status: $status,
            price: $price,
            quantity: $quantity,
            }
          });
      
          res.status(201).json({
            success: true,
            jewelry: newJewelry,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: 'Internal Server Error',
          });
        }
      },
      updateJewelry: async (req, res) => {
        try {
          const {
            name: $name,
            description: $description,
            category: $category,
            status: $status,
            price: $price,
            quantity: $quantity,
            main_image: $main_image,
            extra_images: $extra_images
          } = req.body;
      
          // Check if the jewelry ID is provided in the request parameters
          const jewelryId = req.params.id;
          if (!jewelryId) {
            return res.status(400).json({
              success: false,
              error: 'Jewelry ID not provided',
            });
          }
      
          // Upload main image to Cloudinary
          const mainImage = await cloudinary.uploader.upload(req.body.main_image, {
            folder: 'your_cloudinary_folder',
          });
      
          // Upload extra images to Cloudinary
          const extraImages = await Promise.all(
            req.body.extra_images.map(async (extraImage) => {
              return await cloudinary.uploader.upload(extraImage, {
                folder: 'your_cloudinary_folder',
              });
            })
          );
            
          // Update the jewelry item in the database
          const updatedJewelry = await jewelry.update({
            where: {
              id: parseInt(jewelryId),
            },
            data: {
              name: $name,
              description: $description,
              category: $category,
              main_image: mainImage.secure_url,
              extra_images: extraImages.map((image) => image.secure_url),
              status: $status,
              price: $price,
              quantity: $quantity,
            },
          });
      
          res.status(200).json({
            success: true,
            jewelry: updatedJewelry,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: 'Internal Server Error',
          });
        }
      },
      deleteJewelry: async (req, res) => {
        try {
          // Check if the jewelry ID is provided in the request parameters
          const jewelryId = req.params.id;
          if (!jewelryId) {
            return res.status(400).json({
              success: false,
              error: 'Jewelry ID not provided',
            });
          }
      
          // Find the jewelry item in the database
          const foundJewelry = await jewelry.findUnique({
            where: {
              id: parseInt(jewelryId),
            },
          });
      
          // If the jewelry item is not found, return an error
          if (!foundJewelry) {
            return res.status(404).json({
              success: false,
              error: 'Jewelry not found',
            });
          }
      
          // Delete the jewelry item from the database
          await jewelry.delete({
            where: {
              id: parseInt(jewelryId),
            },
          });
      
          res.status(200).json({
            success: true,
            message: 'Jewelry deleted successfully',
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: 'Internal Server Error',
          });
        }
      }
      
      
      



}
