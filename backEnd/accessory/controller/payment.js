const { user, cart, payment } = require("../models/index");

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
        const { userId, cartId, paymentMethod } = req.body;

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
        const summary=generateOrderSummary(newPayment)
        res.status(201).json(summary);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getMyPayments = async (req, res) => {
    try {
        const { userId } = req.params;

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

module.exports = {
    createPayment,
    getMyPayments
};
