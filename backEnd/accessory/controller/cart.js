const { user, jewelry, cart, cartItem } = require("../models/index");

const addNewCartItem=async(jewelryID,cartID)=>{
    // Fetch the jewelry
    const foundJewelry = await jewelry.findUnique({
      where: {
        id: parseInt(jewelryID),
      },
    });

    if (!foundJewelry) {
      console.error('Jewelry not found.');
      return res.status(404).json({ error: 'Jewelry not found' });
    }

    // Create a new CartItem for the Jewelry
    const newCartItem = await cartItem.create({
      data: {
        name: foundJewelry.name,
        image: foundJewelry.main_image,
        price: foundJewelry.price,
        quantity: 1, // Initial quantity
        total: foundJewelry.price, // Initial total
        cart: {
          connect: { id: cartID },
        },
        jewelry: {
          connect: { id: parseInt(jewelryID) },
        },
      },
    });

    console.log('New item added to cart:', newCartItem);
  }
const createNewCart=async(userID)=>{
    return await cart.create({
          data: {
              cartStatus: 'EMPTY',
              user: {
                  connect: {id: parseInt(userID)},
              },
          },
          include: {
              items: true
          },

      })
  }
const updateQuantity=async(existingItem,step=1)=>{
    const updatedItem = await cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + step,
          total: (existingItem.quantity + step) * existingItem.price,
        },
      });
      return updatedItem
}
module.exports = {
    getCarts: async (req, res) => {
        try {
          const result = await cart.findMany(
            {
                include: {
                    items: true,
                  },
            }
          );
          res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
      getMyCart: async (req, res) => {
        const id=req.userId
        try {
            let result = await cart.findFirst({
                where: {
                    userId: parseInt(id),
                    cartStatus: 'PENDING',
                },
                include: {
                    items: true,
                },
            });

            if (!result) {
                // If no cart with 'Pending' status is found, check for any non-'Paid' cart
                result = await cart.findFirst({
                    where: {
                        userId: parseInt(id),
                        cartStatus:'EMPTY'
                    },
                    include: {
                        items: true,
                    },
                });
                if (!result) {
                    result = await createNewCart(id);
                }
                if(result && result.items.length>0) {

                    await cart.update({
                        where: {
                            id: result.id,
                        },
                        data: {
                            cartStatus: 'PENDING',
                        },
                    });
                }
            }



            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

  addToCart: async (req, res) => {
    const userID = req.userId

    const { jewelryID } = req.params;

    try {
          // Fetch the User
          const foundUser = await user.findUnique({
            where: {
              id: parseInt(userID),
            },
          });

          if (!foundUser) {
            console.error('User not found.');
            return res.status(404).json({ error: 'User not found' });
          }

          // Fetch the Cart associated with the User
          let userCart = await cart.findFirst({
            where: {
              userId: parseInt(userID),
                cartStatus: {
                    not: 'PAID'
                },
            },
            include: {
              items: true,
            },
          });

      // If the User has no Cart, create a new one
      if (!userCart) {
          userCart = await createNewCart(userID);
      }

      // Check if the Cart status is 'pending'
      if (userCart.cartStatus === 'PENDING') {
        const existingItem = userCart.items.find(
          (item) => item.jewelryId === parseInt(jewelryID)
        );

        if (existingItem) {
          // Modify quantity and total for existing Jewelry in Cart
          const updatedItem = await updateQuantity(existingItem)

          console.log('Quantity and total updated for existing item:', updatedItem);
        } else {
            await addNewCartItem(jewelryID,userCart.id)
        }

    }
    else {
        await addNewCartItem(jewelryID,userCart.id);
        await cart.update({
            where: {
              id: parseInt(userCart.id),
            },
            data: {
              cartStatus: 'PENDING',
            },
          });
    }

      console.log('Item added to cart successfully');
      res.status(201).json();
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  incrementItem:async(req,res)=>{
    const {id}=req.params
    const userId = req.userId
    try {
      const existingItem = await cartItem.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
          cart: true
        }
      });
      if(!existingItem)
      return res.status(404).json({ error: 'Item not found' });
       console.log(existingItem)
       if (existingItem.cart.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
    const updatedItem=await updateQuantity(existingItem)
    res.status(201).json(updatedItem)
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
  },
  decrementItem:async(req,res)=>{
    const {id}=req.params
    const userId= req.userId
    try {
    const existingItem = await cartItem.findUnique(

        {
            where:{
                id: parseInt(id)
            },
            include: {
              cart: true
            }
        }
      );
      if(!existingItem)
      return res.status(404).json({ error: 'Item not found' });
      if (existingItem.cart.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
    if (existingItem.quantity===1)
    {
        await cartItem.delete(
            {
                where:{
                    id: parseInt(id)
                }
            }
        );

        return res.status(204).send('product removed from cart');

    }
    const updatedItem=await updateQuantity(existingItem,-1)
    res.status(201).json(updatedItem)
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
  },
  removeFromCart: async (req, res) => {
    const {  cartItemID } = req.params
    const userID= req.userId
    try {

        const result= await cart.findFirst({
            where: {
              userId: parseInt(userID),
              cartStatus: {
                    not: 'PAID'
                },
            },
            include: {
                items:true
              },
          });

        if (!result) {
            return res.status(404).json({ error: 'Cart not found' });
        }


        await cartItem.delete(
            {
                where:{
                    id: parseInt(cartItemID)
                }
            }
        );
        // Check if the number of items in the cart becomes zero after deletion
        if (result.items.length === 1) {
            // Trigger additional logic here
            // For example, you can send a notification or perform some other action
            await cart.update({
                where: {
                    id: parseInt(result.id),
                },
                data: {
                    cartStatus: 'EMPTY',
                },
            });
            console.log('Cart is now empty after item removal. Trigger additional logic.');
        }

        res.status(204).send('product removed from cart');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
removeAllFromCart: async (req, res) => {
    const userID  = req.userId
    try {

        const result= await cart.findFirst({
            where: {
              userId: parseInt(userID),
                cartStatus:'PENDING',
            },
            include: {
                items:true
              },
          });

        if (!result) {
            return res.status(404).json({ error: 'Cart not found or Empty' });
        }

        await cartItem.deleteMany(
            {
                where:{
                    cartId: parseInt(result.id)
                }
            }
        );
        await cart.update({
            where: {
                id: parseInt(result.id),
            },
            data: {
                cartStatus: 'EMPTY',
            },
        });
        res.status(204).send('Cart empty');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},

};
