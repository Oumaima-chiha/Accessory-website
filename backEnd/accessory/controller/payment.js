const { user, cart, payment,billingInfo,shippingAddress } = require("../models/index");
const fs = require("fs");
const generateReceipt = require("../utils/pdfGenerator");
const findPendingCart = async (userId) => {
    try {
        let result = await cart.findFirst({
            where: {
                userId: parseInt(userId),
                cartStatus: {
                    not:'PAID'
                },
                cartStatus:'PENDING',
            },
            include: {
                items: true,
            },
        });

        if (!result) {
            // If no cart with 'Pending' status is found, check for any non-'Paid' cart
            result = await cart.findFirst({
                where: {
                    userId: parseInt(userId),
                    cartStatus: {
                        not: 'PAID'
                    },
                },
                include: {
                    items: true,
                },
            });
        }

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving cart');
    }
};

// Helper function to generate order summary
const generateOrderSummary = (payment) => {
    try {
        // Extract relevant information for the order summary
        return {
            orderId: payment.id,
            paymentMethod: payment.paymentMethod,
            customer: {
                name: payment.customer.fullname,
                email: payment.customer.email,
            },
            cartItems: payment.cart.items.map((item) => ({
                name: item.jewelry.name,
                price: item.price,
                quantity: item.quantity,
                total: item.total,
            })),
            totalAmount: payment.cart.items.reduce((total, item) => total + item.total, 0),
            paymentDate: payment.createdAt,
            // Add other relevant information as needed
        };
    } catch (error) {
        console.error('Error generating order summary:', error.message);
        return null;
    }
};

const createPayment = async (req, res) => {
    try {
        const { paymentMethod, billingInfo: billing, shippingAddress: shipping } = req.body;
        const userId = req.userId;

        if (!billing && !shipping) {
            return res.status(400).json({ error: 'Missing billingInfo or shippingAddress' });
        }

        // Fetch user and related information
        const currentUser = await user.findUnique({
            where: { id: parseInt(userId) },
            include: {
                billingInfo: true,
                shippingAddress: true,
            },
        });
  

        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Use the extracted code to find the user's cart
        const currentCart = await findPendingCart(userId);
        console.log(currentCart)

        // Check if the cart is empty or not found
        if (!currentCart || (currentCart.items && currentCart.items.length === 0)) {
            return res.status(403).json({ error: 'Cart not found or is empty' });
        }

        // Add or update billing info if provided
        if (billing) {
            // Update existing or create new billing info
            await billingInfo.upsert({
                where: { id: currentUser.billingInfo?.id },
                update: billing,
                create: { ...billing, userId: currentUser.id },
            });
        }

        // Add or update shipping address if provided
        if (shipping) {
            // Update existing or create new shipping address
            await shippingAddress.upsert({
                where: { id: currentUser.shippingAddress?.id },
                update: shipping,
                create: { ...shipping, userId: currentUser.id },
            });
        }

        // Create payment record
        const newPayment = await payment.create({
            data: {
                createdAt: new Date(),
                paymentMethod,
                customer: { connect: { id: currentUser.id } },
                cart: { connect: { id: currentCart.id } },
            },
            include: {
                cart: {
                    include: {
                        items: {
                            include: {
                                jewelry: true,
                            },
                        },
                    },
                },
                customer: true,
            },
        });

        // Update cart status to PAID
        await cart.update({
            where: { id: currentCart.id },
            data: { cartStatus: 'PAID' },
        });

        const summary = generateOrderSummary(newPayment);
        res.status(201).json(summary);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getMyPayments = async (req, res) => {
    try {
        const userId= req.userId


        // Fetch user payments
        const userPayments = await payment.findMany({
            where: { customerId: parseInt(userId) },
            include: { customer: true, cart: { include: { items: { include: { jewelry: true } } } } },
        });

        if (!userPayments || userPayments.length === 0) {
            return res.status(404).json({ error: 'No payments found for the user' });
        }
        // Generate order summaries for each payment
        const paymentSummaries = userPayments.map(generateOrderSummary).filter((summary) => summary !== null);

        res.status(200).json(paymentSummaries);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const downloadReceipt = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const userId = req.userId;

        // Fetch payment details
        const currentPayment = await payment.findUnique({
            where: { id: parseInt(paymentId) },
            include: { customer: true, cart: { include: { items: { include: { jewelry: true } } } } },
        });

        if (!currentPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Check if the authenticated user is the same as the customer associated with the payment
        if (currentPayment.customer.id !== parseInt(userId)) {
            return res.status(403).json({ error: 'Unauthorized: You are not allowed to download this receipt.' });
        }

        // Generate order summary
        const orderSummary = generateOrderSummary(currentPayment);

        // Generate receipt PDF
        const fileName = await generateReceipt(orderSummary);

        res.download(fileName, `receipt.pdf`, (err) => {
            if (err) {
                console.error('Error downloading file:', err.message);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                // Optionally, you can delete the file after sending
                fs.unlinkSync(fileName);
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    createPayment,
    getMyPayments,
    downloadReceipt
};
