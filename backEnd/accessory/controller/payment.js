const { user, cart, payment,billingInfo,shippingAddress } = require("../models/index");
const fs = require("fs");
const generateReceipt = require("../utils/pdfGenerator");

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
        const { cartId, paymentMethod, billingInfo: billing, shippingAddress: shipping } = req.body;
        const userId= req.userId

        if (!billing && !shipping) {
            return res.status(400).json({ error: 'Missing billingInfo or shippingAddress ' });
        }

        // Fetch user and cart
        const currentUser = await user.findUnique({
            where: { id: parseInt(userId) },
        });

        const currentCart = await cart.findUnique({
            where: { id: parseInt(cartId) },
        });

        if (!currentUser || !currentCart) {
            return res.status(404).json({ error: 'User or cart not found' });
        }

        // Add or update billing info if provided
        if (billing) {
            // Check if user already has billing info
            if (currentUser.billingInfo) {
                // Update existing billing info
                await billingInfo.update({
                    where: { id: currentUser.billingInfo.id },
                    data: billing,
                });
            } else {
                // Create new billing info
                await billingInfo.create({
                    data: { ...billing, user: { connect: { id: currentUser.id } } },
                });
            }
        }

        // Add or update shipping address if provided
        if (shipping) {
            // Check if user already has shipping address
            if (currentUser.shippingAddress) {
                // Update existing shipping address
                await shippingAddress.update({
                    where: { id: currentUser.shippingAddress.id },
                    data: shipping,
                });
            } else {
                // Create new shipping address
                await shippingAddress.create({
                    data: { ...shipping, user: { connect: { id: currentUser.id } } },
                });
            }
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
